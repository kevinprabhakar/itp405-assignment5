const frisby = require('frisby');

const Joi = frisby.Joi;

it('should return a status of 404 when the track is not found', ()=>{
    return frisby
    .patch('http://localhost:8000/api/tracks/-1')
    .expect('status',404);
});

it('should return a status of 200 and have the correct body attributes',()=>{
    return frisby
    .patch('http://localhost:8000/api/tracks/5',{
        name: 'ITP'
    })
    .expect('status', 200)
    .expect('json','name','ITP');
});

it('should return a status of 422 and have correct error messages when incorrect attributes sent to track patch', ()=>{
    return frisby
    .patch('http://localhost:8000/api/tracks/5',{
        name: ' ',
        milliseconds:'a',
        unitPrice:'b'
    })
    .expect('status', 422)
    .expect('json','errors.?.attribute','name')
    .expect('json','errors.?.message','Name is required')
    .expect('json','errors.?.attribute','milliseconds')
    .expect('json','errors.?.message','Milliseconds must be numeric')
    .expect('json','errors.?.attribute','unitPrice')
    .expect('json','errors.?.message','UnitPrice must be numeric');
});
