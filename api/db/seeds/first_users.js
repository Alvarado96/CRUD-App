/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {firstname: "Joe", lastname: "doe", username: 'jay23', password: '$2a$10$iMGxqtbc9cdWPzSoVCVl9.2JHHiAajjoaPWbzaFFZKwYifKxgEAOu'}
  ]);
};
