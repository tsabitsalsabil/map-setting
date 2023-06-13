import axios from 'axios';
import ClientError from '../utils/ClientError';
import InvariantError from '../utils/InvariantError';
import NotFoundError from '../utils/NotFoundError';

const api = {
  async fetchRequest(url, options = {}) {
    try {
      const request = await fetch(url, options);
      const response = await request.json();
      if (request.status === 400) {
        throw new InvariantError(response.message);
      }
      if (request.status === 404) {
        throw new NotFoundError(response.message);
      }
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        alert(error.message);
      }
      return {
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  },

  async fetchMapListData() {
    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps`, {
      method: 'GET',
    });
    return response.data;
  },

  async deleteMapListData(id) {
    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps/${id}`, {
      method: 'DELETE',
    });
    return response.success;
  },

  async addMapListData({ map, uploadedFile, fileType }) {
    const formData = new FormData();
    formData.append('file', uploadedFile[0]);
    formData.append('name', map);
    formData.append('title', map);
    formData.append('type', fileType);

    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps`, {
      method: 'POST',
      body: formData,
    });
    return response.data.id;
  },

  async updateMapListData(id, {
    name, title, type, file,
  }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('type', type);
    formData.append('file', file[0]);

    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps/${id}`, {
      method: 'PUT',
      body: formData,
    });
    console.log({ responseData: response.data });

    return {
      success: response.success,
      id: response.id,
    };
  },

  async addMapListDataFromOnlineSource({
    name, title, type, url,
  }) {
    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps/web-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        title,
        type,
        url,
      }),
    });
    console.log({ response });
    return response.data;
  },

  async fetchSearchByCategories({
    category, query,
  }) {
    const response = await this.fetchRequest(`${process.env.BE_PORT}/api/basemaps?category=${category} &&query=${query}`, {
      method: 'GET',
    });
    return response.data;
  },
};

export default api;
