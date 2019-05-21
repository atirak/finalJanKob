//inside building.read.test.js
const assert = require('assert');
const Building = require('../models/Build.model');
let building;

describe('แก้ไขตึก', () => {
    beforeEach((done) => {
        building= new Building({ name: "edit", namefull: "ยังไม่ได้แก้" });
        building.save()
            .then(() => {
                done();
            })
    })

    function assertHelper(statement, done) {
        statement
         .then(() => Building.find({}))
         .then((building) => {
          assert(building.length === 1);
          assert(building[0].namefull === 'แก้ไขแล้ว');
          done();
        });
      }

      it('ตั้งข้อมูล building ใหม่ และบันทึกลงด้วย instance', (done) => {
        building.set('namefull', 'แก้ไขแล้ว'); 
        assertHelper(building.save(), done);
       });
     
      it('อัพเดทข้อมูลโดยใช้ instance', (done) => {
        // สำหรับถ้ามีชื่อซ้ำกันหลายๆอะ
        assertHelper(building.update({ namefull: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลทั้งหมดที่ตรงโดยใช้ model', (done) => {
        assertHelper(Building.update({ namefull: 'ยังไม่ได้แก้' }, { namefull: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลที่เจอครั้งเดียวโดยใช้ model', (done) => {
        assertHelper(Building.findOneAndUpdate({ namefull: 'ยังไม่ได้แก้' }, { namefull: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลโดยใช้ object id ของ mongodb', (done) => {
        assertHelper(Building.findByIdAndUpdate(building._id, { namefull: 'แก้ไขแล้ว' }), done);
      });
});