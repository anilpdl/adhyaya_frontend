class ApiUrlConfig {
  constructor() {
    this.endPoint = "http://adhyaya-dev.herokuapp.com";
  }

  apiEndPoint() {
    return this.endPoint;
  }
};

const apiUrl = new ApiUrlConfig();

export default apiUrl;
