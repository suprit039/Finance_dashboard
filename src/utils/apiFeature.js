class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "limit", "sort", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.where(queryObj);
    return this;
  }

  search(fields = []) {
    if (this.queryString.search && fields.length > 0) {
      const searchValue = this.queryString.search;

      const { Op } = require("sequelize");

      const searchConditions = fields.map((field) => ({
        [field]: {
          [Op.iLike]: `%${searchValue}%`,
        },
      }));

      this.query = this.query.where({
        [Op.or]: searchConditions,
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").map((field) => {
        if (field.startsWith("-")) {
          return [field.substring(1), "DESC"];
        }
        return [field, "ASC"];
      });

      this.query = this.query.order(sortBy);
    } else {
      this.query = this.query.order([["createdAt", "DESC"]]);
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;

    const offset = (page - 1) * limit;

    this.query = this.query.limit(limit).offset(offset);

    return this;
  }
}

module.exports = APIFeatures;