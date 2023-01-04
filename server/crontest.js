const cron =require ("node-schedule");
const somedate =new Date('2022-12-29T12:46:00.000+5:30')
const job =cron.scheduleJob(somedate,()=>{
    console.log('hi',new Date().toString());
    job.cancel();
})
