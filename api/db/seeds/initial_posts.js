/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {id_user: 1, title: "First Blog Post", content: "Welcome to your first blog post"},
    {id_user: 1, title: "Another Blog Post", content: "This is another blog post about \
    different things in life.  Maybe I can talk about building this website.  Its been \
    a challenge but its been fun.  To be honest, if i dont earn the z prefix this time around \
    i will still be happy because i never thought id make it this far building a CRUD app."}
  ]);
};
