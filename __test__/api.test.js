const Request = require('supertest');
const apiPlugin = require('../routes/anakRoutes');
const TestHelper = require('./unitTestHelper');
const Anak = require('../models/anak');

let server;

describe('TUMBUH-KEMBANG-ANAK-API', () => {
    beforeAll(() => {
        server = TestHelper.createTestServer('/', apiPlugin);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('get all data anak', () => {
        test('It should return status response 200: get all data anak', async () => {
            jest.spyOn(Anak, 'find').mockResolvedValue(TestHelper.getAllMockDataAnak)
            await Request(server)
                .get('/')
                .expect((response) => {
                    expect(response.statusCode).toEqual(200);
                    expect(typeof response.body).toBe('object');
                    expect(response.body.length).toBeGreaterThan(0);

                    for (const { nama, usia, beratBadan, tinggiBadan, milestone } of response.body) {
                        expect(typeof nama).toBe('string');
                        expect(typeof usia).toBe('number');
                        expect(typeof beratBadan).toBe('number');
                        expect(typeof tinggiBadan).toBe('number');
                        expect(typeof milestone).toBe('object');
                    }
                });
        });

        test('It should return status response 400: failed connect db', async () => {
            jest.spyOn(Anak, 'find').mockRejectedValue({ code: 400, message: 'failed connect to mongodb' })
            await Request(server)
                .get('/')
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBe('failed connect to mongodb');
                });
        });
    });

    describe('get data anak by id', () => {

        test('It should return status response 200: get data anak by id', async () => {
            jest.spyOn(Anak, 'findById').mockResolvedValue(TestHelper.getOneMockDataAnak)
            await Request(server)
                .get(`/${TestHelper.getdefaultId}`)
                .expect((response) => {
                    expect(response.statusCode).toEqual(200);

                    const { nama, usia, beratBadan, tinggiBadan, milestone } = response.body
                    expect(typeof nama).toBe('string');
                    expect(typeof usia).toBe('number');
                    expect(typeof beratBadan).toBe('number');
                    expect(typeof tinggiBadan).toBe('number');
                    expect(typeof milestone).toBe('object');
                });
        });

        test('It should return status response 404: data not found', async () => {
            jest.spyOn(Anak, 'findById').mockResolvedValue(false);
            await Request(server)
                .get(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(404);
                    expect(response.body.message).toBeDefined();
                });
        });

        test('It should return status response 400: failed connect db', async () => {
            jest.spyOn(Anak, 'findById').mockRejectedValue({ code: 400, message: 'failed connect to mongodb' })
            await Request(server)
                .get(`/${TestHelper.getdefaultId}`)
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBe('failed connect to mongodb');
                });
        });
    });

    describe('add new data anak', () => {

        test('It should return status response 200: add new data anak', async () => {
            jest.spyOn(Anak.prototype, 'save').mockResolvedValue(TestHelper.getOneMockDataAnak);
            await Request(server)
                .post('/add')
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(201);
                    expect(response.body).toBeDefined();

                    const { nama, usia, beratBadan, tinggiBadan, milestone } = response.body
                    expect(typeof nama).toBe('string');
                    expect(typeof usia).toBe('number');
                    expect(typeof beratBadan).toBe('number');
                    expect(typeof tinggiBadan).toBe('number');
                    expect(typeof milestone).toBe('object');
                });
        });

        test('It should return status response 400: get error validation', async () => {
            jest.spyOn(Anak.prototype, 'save').mockResolvedValue(true);
            await Request(server)
                .post('/add')
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBeDefined();

                });
        });

        test('It should return status response 400: failed connect db', async () => {
            jest.spyOn(Anak.prototype, 'save').mockRejectedValue({ code: 400, message: 'failed connect to mongodb' })
            await Request(server)
                .post('/add')
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBe('failed connect to mongodb');
                });
        });
    });

    describe('edit data anak', () => {

        test('It should return status response 200: edit data anak', async () => {
            jest.spyOn(Anak, 'findByIdAndUpdate').mockResolvedValue(TestHelper.getOneMockDataAnak);
            await Request(server)
                .put(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toBeDefined();

                    const { nama, usia, beratBadan, tinggiBadan, milestone } = response.body
                    expect(typeof nama).toBe('string');
                    expect(typeof usia).toBe('number');
                    expect(typeof beratBadan).toBe('number');
                    expect(typeof tinggiBadan).toBe('number');
                    expect(typeof milestone).toBe('object');
                });
        });

        test('It should return status response 400: get error validation', async () => {
            jest.spyOn(Anak, 'findByIdAndUpdate').mockResolvedValue(true);
            await Request(server)
                .put(`/${TestHelper.getdefaultId}`)
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBeDefined();
                });
        });

        test('It should return status response 404: data not found', async () => {
            jest.spyOn(Anak, 'findByIdAndUpdate').mockResolvedValue(false);
            await Request(server)
                .put(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(404);
                    expect(response.body.message).toBeDefined();
                });
        });

        test('It should return status response 400: failed connect db', async () => {
            jest.spyOn(Anak, 'findByIdAndUpdate').mockRejectedValue({ code: 400, message: 'failed connect to mongodb' })
            await Request(server)
                .put(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBe('failed connect to mongodb');
                });
        });
    });

    describe('delete data anak', () => {

        test('It should return status response 200: delete data anak', async () => {
            jest.spyOn(Anak, 'findByIdAndDelete').mockResolvedValue(TestHelper.getOneMockDataAnak);
            await Request(server)
                .del(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(200);
                    expect(response.body.message).toBeDefined();
                });
        });

        test('It should return status response 404: data not found', async () => {
            jest.spyOn(Anak, 'findByIdAndDelete').mockResolvedValue(false);
            await Request(server)
                .del(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(404);
                    expect(response.body.message).toBeDefined();
                });
        });

        test('It should return status response 400: failed connect db', async () => {
            jest.spyOn(Anak, 'findByIdAndDelete').mockRejectedValue({ code: 400, message: 'failed connect to mongodb' })
            await Request(server)
                .del(`/${TestHelper.getdefaultId}`)
                .send(TestHelper.getOneMockDataAnakNoId)
                .expect((response) => {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body.message).toBe('failed connect to mongodb');
                });
        });
    });

});
