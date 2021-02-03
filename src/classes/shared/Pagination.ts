import { Request } from "express";

class Pagination {
  protected req: Request;
  protected result: any;
  protected modelTitle: string;
  protected arranger: CallableFunction | null;

  protected perPage: number;
  protected page: number;
  protected items: { rows: object; count: number };
  protected skip: number;
  protected limit: number;
  protected choice: string;

  protected totalItemsCount: number = 0;

  constructor(
    req: Request,
    modelTitle: string = "records",
    arranger: CallableFunction | null = null
  ) {
    this.req = req;
    this.modelTitle = modelTitle;
    this.getResult();
    this.arranger = arranger;
  }

  protected getResult = () => {
    const { list } = this.req.query;
    if (list === "paginate") {
      this.choice = "paginate";
    } else if (list === "lazy") {
      this.choice = "lazy";
    } else {
      this.choice = "none";
      return true;
    }
    return true;
  };

  public getOffset = () => {
    if (this.choice === "paginate") {
      return this.calculatePage();
    } else if (this.choice === "lazy") {
      return this.calculateLazy();
    } else {
      return {};
    }
  };

  public getPaginatedResult = (items: { rows: object; count: number }) => {
    this.items = items;
    switch (this.choice) {
      case "paginate":
        return this.paginate();
      case "lazy":
        return this.lazy();
      default:
        return this.none();
    }
  };

  public setCountManually = (count: number) => {
    this.totalItemsCount = count;
  };

  protected none = () => {
    let { count: totalItems, rows: records } = this.items;
    if (this.totalItemsCount) {
      totalItems = this.totalItemsCount;
    }
    this.result = {
      totalItems: totalItems,
    };
    this.result[this.modelTitle] = this.arranger
      ? this.arranger(records)
      : records;
    return this.result;
  };

  protected paginate = () => {
    let { count: totalItems, rows: records }: any = this.items;
    if (this.totalItemsCount) {
      totalItems = this.totalItemsCount;
    }
    const totalPages = Math.ceil(totalItems / this.perPage);
    this.result = {};
    let afterThis: number;
    if (this.perPage > totalItems || totalPages === this.page) {
      afterThis = 0;
    } else {
      afterThis = totalItems - (this.perPage + this.perPage * (this.page - 1));
    }
    this.result.info = {
      itemsCount: {
        before: (this.page - 1) * this.perPage,
        after: afterThis,
      },
      totalPages: totalPages,
      totalItems: totalItems,
      currentPage: this.page,
      perPage: this.perPage,
      hasNext: totalPages !== this.page,
      hasPrev: this.page !== 1,
    };
    this.result[this.modelTitle] = this.arranger
      ? this.arranger(records)
      : records;
    return this.result;
  };

  protected calculatePage = () => {
    const { page: pageQuery, per_page: perPageQuery } = this.req.query;
    let page: number, perPage: number;
    if (typeof pageQuery === "number") {
      page = pageQuery;
    } else if (typeof pageQuery === "string") {
      page = parseInt(pageQuery);
    } else {
      page = 1;
    }
    if (typeof perPageQuery === "number") {
      perPage = perPageQuery;
    } else if (typeof perPageQuery === "string") {
      perPage = parseInt(perPageQuery);
    } else {
      perPage = 8;
    }
    this.perPage = perPage;
    this.page = page;
    return {
      limit: this.perPage,
      offset: (this.page - 1) * this.perPage,
    };
  };

  protected lazy = () => {
    let { count: totalItems, rows: records } = this.items;
    if (this.totalItemsCount) {
      totalItems = this.totalItemsCount;
    }
    const beforeThis = this.skip;
    let afterThis: number;
    if (this.limit > totalItems) {
      afterThis = 0;
    } else {
      afterThis = totalItems - (this.limit + this.skip);
    }
    // const afterThis = totalItems - (this.limit + this.skip);
    const hasNext: boolean = afterThis > 0;
    const hasPrev: boolean = !!beforeThis;
    this.result = {};
    this.result.info = {
      itemsCount: {
        before: beforeThis,
        after: afterThis,
      },
      totalItems: totalItems,
      hasNext,
      hasPrev,
    };
    this.result[this.modelTitle] = this.arranger
      ? this.arranger(records)
      : records;
    return this.result;
  };

  protected calculateLazy = () => {
    const { skip, limit } = this.req.query;
    if (typeof skip === "number") {
      this.skip = skip;
    } else if (typeof skip === "string") {
      this.skip = parseInt(skip);
    } else {
      this.skip = 0;
    }
    if (typeof limit === "number") {
      this.limit = limit;
    } else if (typeof limit === "string") {
      this.limit = parseInt(limit);
    } else {
      this.limit = 8;
    }
    return {
      offset: this.skip,
      limit: this.limit,
    };
  };

  protected arrangeCount = (counts) => {
    let all = 0;
    counts.map.forEach((cur) => {
      all += parseInt(cur.count);
    });
    return all;
  };
}

export default Pagination;
