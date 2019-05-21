//inside building.read.test.js
const assert = require('assert');
const Building = require('../models/Build.model');

describe(`ลบตึก`, () => {
    var building;


    beforeEach((done) => {
        building = new Building({
            name: "nana",
            namefull: "ตึกนะ"
        })
        building.save()
            .then(() => {
                done();
            })
    })

    it('ลบตึกโดยใช้ instance', (done) => {
        building.remove()
            .then(() => Building.findOne({
                name: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

    it('ลบทุกตัวที่ชื่อรหัสตึก nana', (done) => {
        Building.remove({
                name: 'nana'
            })
            .then(() => Building.findOne({
                name: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

    it('หาและลบรหัสตึก nana', (done) => {
        Building.findOneAndRemove({
                name: 'nana'
            })
            .then(() => Building.findOne({
                name: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

})