
//inside building.create.test.js
const assert = require('assert');
const Building = require('../models/Build.model');
describe('Creating documents', () => {
    before(done => {
        Building.findOneAndRemove({ name: "IF"})
            .then(() => {
                done()
            })
    })
    it('สร้างตึก', (done) => {
        const building = new Building({ name: "IF", namefull: "INFORMATICS" });
        building.save()
            .then(() => {
                assert(!building.isNew); //if poke is saved to db it is not new
                Building.remove(building)
                done();
            });
    });
});