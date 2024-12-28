const express = require('express');
const app = express();
const MockDataAnak = require('./assets/dataAnak.json');

const createTestServer = (path, plugin) => {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true
        })
    );

    app.use((req, res, next) => {
        const oldSend = res.send;
        res.send = async (data) => {
            res.send = oldSend; // set function back to avoid the 'double-send'
            const statusCode = (data.output && data.output.statusCode) || res.statusCode;
            let bodyResponse = data;

            if (statusCode !== 200 && data.isBoom) {
                bodyResponse = data.output.payload;
            }

            return res.status(statusCode).send(bodyResponse);
        };

        next();
    });

    app.use(path, plugin);

    return app.listen(null, () => { });
};

const getAllMockDataAnak = MockDataAnak;
const getOneMockDataAnak = MockDataAnak[0];
const destructData = () => {
    const data = MockDataAnak[0];
    const id = data._id
    delete data._id;
    return {
        getOneMockDataAnakNoId: data,
        getdefaultId: id
    };
};

const { getOneMockDataAnakNoId, getdefaultId } = destructData()

module.exports = {
    createTestServer,
    getAllMockDataAnak,
    getOneMockDataAnak,
    getOneMockDataAnakNoId,
    getdefaultId
}