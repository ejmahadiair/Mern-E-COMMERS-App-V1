//Product filtaring system
class Apifetures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.querystr };
    //remove some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    //filter price

    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(querystr));

    return this;
  }
  pagination(resultPage) {
    const currentPage = Number(this.querystr.page) || 1; //50
    const skip = resultPage * (currentPage - 1);
    this.query = this.query.limit(resultPage).skip(skip);
    return this;
  }
}

module.exports = Apifetures;
