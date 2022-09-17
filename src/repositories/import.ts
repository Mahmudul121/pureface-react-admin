import Base from "./base";

class Import extends Base<any, any> {
  importCsv = async (url: string, variables: any) => {
    let formData = new FormData();
    formData.append("csv", variables?.csv);
    formData.append("shop_id", variables?.shop_id);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await this.http("http://3.89.121.115/import-products", "post", formData, options);
    console.log('import csv file=>', response.data);
    return response.data;
  };
}

export default new Import();
