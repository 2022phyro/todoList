// import express from 'express';
const {createClient} = require('@supabase/supabase-js')
require('dotenv').config()
// import morgan from 'morgan'
// import bodyParser from "body-parser";

console.log(process.env.SUPABASE_PROJECT_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY
);
async function createTodo(todo) {
  let { data, error } = await supabase
    .from('todo')
    .insert([
      { title: "todo", description: "salt" }
    ])

  if (error) {
    console.error('Error creating todo: ', error);
    return;
  }

  return data;
}
async function fetchAllTodos() {
  let { data, error } = await supabase
    .from('todo')
    .select()
    console.log("Data", data)

  if (error) {
    console.error('Error fetching todos: ', error);
    return;
  }

  return data;
}
createTodo().then((todo) => {
    console.log(todo)
})
fetchAllTodos().then((todos) => {
    console.log(todos)
})