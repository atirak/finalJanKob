//inside building.read.test.js
// const assert = require('assert');
const assert = require('assert');
const Building = require('../models/Build.model');
let building;

describe('อ่านข้อมูลตึก', () => {
    beforeEach((done) => {
        building= new Building({ name: "IF", namefull: "INFORMATICS" });
        building.save()
            .then(() => {
                done();
            })
    })
    it('ค้นหาตึกด้วยรหัสตึก IF ได้รหัสตึก IF', (done) => {
        Building.findOne({ name: "IF"})
            .then((building) => {
                assert(building.namefull == "INFORMATICS");
                done();
            })
    });
    it('ค้นหาตึกด้วยรหัสตึก IF ได้ชื่อตึก INFORMATICS', (done) => {
        Building.findOne({ name: "IF"})
            .then((building) => {
                assert(building.namefull == "INFORMATICS");
                done();
            })
    });
    it('ค้นหาตึกด้วยชื่อตึก INFORMATICS ได้รหัสตึก IF', (done) => {
        Building.findOne({ name: "IF"})
            .then((building) => {
                assert(building.namefull == "INFORMATICS");
                done();
            })
    });
    it('ค้นหาตึกด้วยรหัสตึก INFORMATICS ได้ชื่อตึก INFORMATICS', (done) => {
        Building.findOne({ namefull: "INFORMATICS"})
            .then((building) => {
                assert(building.namefull == "INFORMATICS");
                done();
            })
    });

    after(done => {
        Building.findOneAndRemove({ buildingId: "BBCZ"})
            .then(() => done())
    })
});