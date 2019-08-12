class ApiUrlConfig {
  constructor() {
    this.endPoint = "http://localhost:8000";
  }

  apiEndPoint() {
    return this.endPoint;
  }
};

const apiUrl = new ApiUrlConfig();

export default apiUrl;
