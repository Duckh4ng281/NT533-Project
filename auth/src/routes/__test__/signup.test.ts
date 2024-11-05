import request from 'supertest';
import { app } from '../../app';

//Kiểm tra xem đăng ký thành công có trả về mã trạng thái 201 hay không
it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup') //Gửi post request đến route đăng ký
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201); //Mong đợi phản hồi từ máy chủ có mã trạng thái 201 (Created)
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup') ////Gửi post request đến route đăng ký
      .send({
        email: 'fasfadsf', //Email không hợp lệ
        password: 'p'//Mật khẩu không hợp lệ
      })
      .expect(400); // Mong đợi máy chủ trả về mã trạng thái 400 (Bad Request)
  });
  
  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com'
      })
      .expect(400);
  
    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'alskjdf'
      })
      .expect(400);
  });