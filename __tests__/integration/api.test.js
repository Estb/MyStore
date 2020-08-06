const request = require("supertest");
const db = require("../../src/models");
const app = require("../../src/app");
const truncate = require("../utils/truncate");

let token;
let id;

describe("POST Shopkeeper", () => {
  beforeAll(async () => {
    await truncate();
  })

  it("Should create a new shopkeeper", async () => {
    let datos = {
      name: "Test",
      lastname: "Test",
      email: "test@test.com",
      password: "1234567890",
    };
    const response = await request(app).post("/api/v1/shopkeeper").send(datos);
    expect(response.status).toBe(201);
    //   expect(response.type).toBe('application/json');
  });

  it("Should authenticate a shopkeeper and receive a JWT token", async () => {
    const response = await request(app).post("/api/v1/shopkeeper/login").send({
      email: "test@test.com",
      password: "1234567890",
    });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    token = response.body[1].token;
    id = response.body[1].userId;
  });
});

describe("GET Shopkeeper", () => {
  it("It should require authorization", async () => {
    const response = await request(app).get("/api/v1/shopkeeper");
    expect(response.status).toBe(401);
  });

  it("It should responds with JSON", () => {
    return request(app)
      .get("/api/v1/shopkeeper")
      .set("x-access-token", `${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});

describe("PUT Shopkeeper", () => {
  it("It should require authorization", async () => {
    const response = await request(app).put("/api/v1/shopkeeper").send({
      name: "test2",
    });
    expect(response.status).toBe(401);
  });

  it("Should edit shopkeeper", async () => {
    const response = await request(app)
      .put("/api/v1/shopkeeper")
      .set("x-access-token", `${token}`)
      .send({
        name: "test2",
      });
    expect(response.status).toBe(200);
  });
});


///////////   Store /////////////////////////////////////////


describe("POST Store", () => {
  it("It should require authorization", async () => {
    let datos = {
      cnpj: "123456789 abc.",
      name: "Test 123 .",
      corporatName: "Teste A123",
    };
    const response = await request(app).post("/api/v1/store").send(datos);
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It should create a new Store", async () => {
    let datos = {
      cnpj: "123456789 abc.",
      name: "Test 123 .",
      corporatName: "Teste A123",
    };
    const response = await request(app)
      .post("/api/v1/store")
      .send(datos)
      .set("x-access-token",`${token}`)
        id = response.body.storeId;
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
  });
});
describe("GET ONE / ALL stores", () => {
  it("ONE / It should require authorization", async () => {
    const response = await request(app)
    .get("/api/v1/store/1");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("GET ONE Store / It should responds (200) with JSON", () => {
    return request(app)
      .get("/api/v1/store/1")
      .set("x-access-token", `${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  it("GET ALL Store/ It should require authorization", async () => {
    const response = await request(app).get("/api/v1/store");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("Get ALL store/ It should responds (200) with JSON", () => {
    return request(app)
      .get("/api/v1/store")
      .set("x-access-token", `${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});

describe("PUT, Test edit store", () => {
  it("It should require authorization", async () => {
    const response = await request(app)
    .put("/api/v1/store/1")
    .send({
      name: "test2",
    });
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It Should edit store", async () => {
    const response = await request(app)
      .put("/api/v1/store/1")
      .set("x-access-token", `${token}`)
      .send({
        name: "test2",
      });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
});

//////////////// Produto ////////////////////////////////



describe("POST Products", () => {
  it("It should require authorization", async () => {
    let datos = {
      name:"Produto_teste",
      sku:"123456",
      description:"Produto Teste",
      category:"teste",
      priceUnit:"20.00",
      amount:"10",
      forecastSale:"100"
    };
    const response = await request(app)
    .post("/api/v1/store/1/products").send(datos);
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It should create a new Product", async () => {
    let datos = {
      name:"Produto_teste",
      sku:"123456",
      description:"Produto Teste",
      category:"teste",
      priceUnit:"20.00",
      amount:"10",
      forecastSale:"100"
    };
    const response = await request(app)
    .post("/api/v1/store/1/products")
      .send(datos)
      .set("x-access-token",`${token}`)
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
  });
});

describe("GET ONE products/ ALL Products", () => {
  it("ONE / It should require authorization", async () => {
    const response = await request(app)
    .get("/api/v1/store/1/products/123456");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("Get ONE products/ It should responds (200) with JSON", () => {
    return request(app)
      .get("/api/v1/store/1/products/123456")
      .set("x-access-token", `${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  it(" Get ALL / It should require authorization", async () => {
    const response = await request(app)
    .get("/api/v1/store/1/products/");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("Get ALL / It should responds (200) with JSON", () => {
    return request(app)
      .get("/api/v1/store/1/products/")
      .set("x-access-token", `${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});

describe("PUT product", () => {
  it("It should require authorization", async () => {
    const response = await request(app)
    .put("/api/v1/store/1/products/123456")
    .send({
      name:"Produto_teste4",
      description:"Produto Teste",
      category:"teste",
      priceUnit:"20.00",
      amount:"150",
      forecastSale:"100"
    });
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It Should edit the product", async () => {
    const response = await request(app)
      .put("/api/v1/store/1/products/123456")
      .set("x-access-token", `${token}`)
      .send({
        name:"Produto_teste4",
        description:"Produto Teste",
        category:"teste",
        priceUnit:"20.00",
        amount:"150",
        forecastSale:"100"
      });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
});

describe("DELETE Products", () => {
  it("It should require authorization", async () => {
    const response = await request(app)
    .delete("/api/v1/store/1/products/123456");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It Should delete the product", async () => {
    const response = await request(app)
      .delete("/api/v1/store/1/products/123456")
      .set("x-access-token", `${token}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
});


//////////////////// store /////////////////////


describe("DELETE store", () => {
  it("It should require authorization", async () => {
    const response = await request(app)
    .delete("/api/v1/store/1");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("It Should delete the store", async () => {
    const response = await request(app)
      .delete("/api/v1/store/1")
      .set("x-access-token", `${token}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
});



//////////////////////////////// Shopkeeper ///////////////////

describe("DELETE Shopkeeper", () => {
  it("It should require authorization", async () => {
    const response = await request(app).delete("/api/v1/shopkeeper");
    expect(response.status).toBe(401);
  });

  it("It Should delete shopkeeper", async () => {
    const response = await request(app)
      .delete("/api/v1/shopkeeper")
      .set("x-access-token", `${token}`);
    expect(response.status).toBe(200);
  });
});
