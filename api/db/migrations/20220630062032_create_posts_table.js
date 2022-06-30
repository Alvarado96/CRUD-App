/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("posts", table => {
        table.increments()
        table.integer('id_user')
        table.foreign('id_user').references('users.id').deferrable('deferred')
        table.string("title")
        table.string("content", 1000)
     })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('posts', table =>{
        table.dropForeign('id_user')
    })
    .then(function () {
        return knex.schema.dropTableIfExists('posts');
    })
    
};
