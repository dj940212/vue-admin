import Mock from 'mockjs';

export default Mock.mock('http://localhost:8080/mock',{
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
})
