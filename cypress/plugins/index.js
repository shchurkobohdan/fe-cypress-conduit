/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    const mongoose = require('mongoose');
    const crypto = require('crypto');

    on('task', {
        async createUser({username, email, password}) {
            const conn = mongoose.createConnection('mongodb://localhost:27017/conduit');

            const userSchema = new mongoose.Schema({
                username: String,
                email: String,
                hash: String,
                salt: String
            });

            userSchema.methods.setPassword = function (password) {
                this.salt = crypto.randomBytes(16).toString('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
            };

            const User = conn.model('User', userSchema);
            let user = new User();
            user.username = username;
            user.email = email;
            user.setPassword(password);
            await user.save();

            await conn.close();
            return null;
        },

        deleteUser({username, email}) {
            let conn = mongoose.createConnection('mongodb://localhost:27017/conduit');
            const User = conn.model('User', new mongoose.Schema({
                username: String,
                email: String
            }));

            conn.once('open', function () {
                User.findOneAndRemove({username: username, email: email}, function (err) {
                        if (!err) {
                            console.log(`'${username}' user is deleted.`)
                        }
                    },
                    async function () {
                        await conn.close();
                    });
            });

            return null;
        },

        dropDB() {
            const conn = mongoose.createConnection('mongodb://localhost:27017/conduit');

            conn.once('open', async function () {
                await conn.dropDatabase();
            }, async function () {
                await conn.close();
            });

            return null;
        }
    });
    return config;
};
