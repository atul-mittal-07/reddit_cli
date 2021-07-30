#! /usr/bin/env node
import open from 'open';
import fetch from 'node-fetch';
import yargs from 'yargs';

// const argv = yargs(process.argv).argv; This is equivalent to below line
const {argv} = yargs(process.argv)    //Here by specifying {argv} we are telling to extract argv property of returned instance from yargs(process.argv)
// console.log(argv);

fetch('https://www.reddit.com/.json')
.then(res=>{
  res.json()
  .then(data=>{
    const children = data.data.children;
    const randomPost = children[Math.floor(Math.random()*children.length)];
    const link = `https://reddit.com${randomPost.data.permalink}`;
    if(argv.print){
      console.log(`
      title: ${randomPost.data.title}
      link: ${link}
      `);
    }
    else{
      console.log(`
      title: ${randomPost.data.title}
      link: ${link}
      `);
      open(link)
      .then(()=>{
        console.log('Link opened on Browser successfully');
      }
        );
    }
  })
  .catch(err=>{
    console.log(err);
  });
})
.catch(err=>{
  console.error(err);
});