const request = require('supertest');
const usernameToUserID = require('../helpers/usernameToUserID')
//#region configure server app
require("dotenv").config({ path: '../env/.env' });
const app = require('../server.js');
const usernameToUserID = require('../helpers/usernameToUserID.js');

let server; // Declare a variable to hold the server instance
beforeAll((done) => {
    // Start the server before running tests
    server = app.listen(process.env.PORT, () => {
        done();
    });
});
afterAll((done) => {
    // Close the server after all tests are complete
    server.close(() => {
        done();
    });
});
//#endregion

const username = "Development TESTER", userid = usernameToUserID(username);
var viewToken = '', editToken = '';
const username2 = "Development TASTER 2", userid2 = usernameToUserID(username2);
var viewToken2 = '', editToken2 = ';';


//#region auth signup login
describe("________    AUTHORISATION    ________", () => {
    function checkUserSelf(user) {
        const expectedKeys = [
            "_id", "username", "img_url", "description", "availible_collections", "email", "verified", "date_created", "date_modified", "isAdmin"
        ]
        for (const key of expectedKeys) expect(user).toHaveProperty(key);
    }

    describe('POST /register', () => {
        it('201: REGISTER USR1 ||403: USER DOES EXIST', async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({ "username": username, "password": "newpassword", "email": "devtest-user@m.mail" });
            expect([201, 403]).toContain(res.statusCode);
            if (res.statusCode === 201) {
                expect(res.body).toHaveProperty('editToken');
                expect(res.body).toHaveProperty('viewToken');
                expect(res.body).toHaveProperty('user');
                if (typeof (res.body.user) === 'object') checkUserSelf(res.body.user)
            }
        })
        it('201: REGISTER USR2 ||403: USER 2 DOES EXIST', async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({ "username": username2, "password": "newpassword2", "email": "devtest2-user2@m2.mail" });
            expect([201, 403]).toContain(res.statusCode);
            if (res.statusCode === 201) {
                expect(res.body).toHaveProperty('editToken');
                expect(res.body).toHaveProperty('viewToken');
                expect(res.body).toHaveProperty('user');
                if (typeof (res.body.user) === 'object') checkUserSelf(res.body.user)
            }
        })

        describe('400: Bad request', () => {
            it('password empty', async () => {
                const res = await request(app)
                    .post("/auth/register")
                    .send({ username, "password": "", "email": "devtest-user@m.mail" });
                expect(res.statusCode).toBe(400);
            });
            it('username wrong type', async () => {
                const res = await request(app)
                    .post("/auth/register")
                    .send({ "password": "Development TESTER", "username": 2, email: "w" });
                expect(res.statusCode).toBe(400);
            });
            it('empty body', async () => {
                const res = await request(app)
                    .post("/auth/register")
                expect(res.statusCode).toBe(400);
            });
        });

        describe('403: Forbidden', () => {
            it('Username or Email taken', async () => {
                const res = await request(app)
                    .post("/auth/register")
                    .send({ username, "password": "newpassword", "email": "mail" });
                expect(res.statusCode).toBe(403);
            })
        });
    })

    describe('POST /login', () => {
        it('200: Successful login', async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({ username, "password": "newpassword", "email": "devtest-user@m.mail" });
            viewToken = res.body.viewToken;
            editToken = res.body.editToken;
            const res2 = await request(app)
                .post("/auth/login")
                .send({ username: username2, "password": "newpassword2" });
            viewToken2 = res2.body.viewToken;
            editToken2 = res2.body.editToken;
            function expectres(res) {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('editToken');
                expect(res.body).toHaveProperty('viewToken');
                expect(res.body).toHaveProperty('user');
                if (typeof (res.body.user) === 'object') checkUserSelf(res.body.user)
            }
            expectres(res);
            expectres(res2);
        })

        describe('400: bad request', () => {
            it('no username', async () => {
                const res = await request(app)
                    .post("/auth/login")
                    .send({ "password": "newpassword" });
                expect(res.statusCode).toBe(400);
            })
        });

        describe('404: User not found', () => {
            it('Username does not exist', async () => {
                const res = await request(app)
                    .post("/auth/login")
                    .send({ "username": "user somebogus mspfajsinadslna,s.av;obeaajveafbkds", "password": "doesntmatter" });
                expect(res.statusCode).toBe(404);
            })
            it('Wrong password', async () => {
                const res = await request(app)
                    .post("/auth/login")
                    .send({ "username": "Development TESTER", "password": "wrong pass" });
                expect(res.statusCode).toBe(404);
            })
        });
    });

    describe('GET /requestCheckUser', () => {
        it('200: Successful check', async () => {
            const res = await request(app)
                .get("/auth/requestcheckuser")
                .set('Authorization', `Bearer ${editToken}`);
            expect(res.statusCode).toBe(200);

            expect(res.body).toHaveProperty('viewToken');
            expect(res.body).toHaveProperty('user');
            if (typeof (res.body.user) === 'object') checkUserSelf(res.body.user)
        })
        it('401: Unauthorised', async () => {
            const res = await request(app)
                .get("/auth/requestcheckuser")
                .set('Authorization', `Bearer bogusToken`);
            expect(res.statusCode).toBe(401);
        })
    });
})
//#endregion

//#region gallery characters
describe("________    GALLERY    CHARACTERS    ________", () => {
    // example list
    const badCharExamples0 = [{}, { shname: null }, { shname: "" }, { "_id": `${userid}_shname` }];
    const badCharExamples1 = [{ "shname": "Rafaello", levels: [{ main_color: "#12345" }] }, { "shname": "Mickelangelo", "view_access": "pubic" },
    { shname: "InvalidColor", levels: [{ main_color: "red" }] },             // Invalid color format
    { shname: "InvalidSex", levels: [{ sex: "unknown" }] },                  // Invalid sex value
    { shname: "InvalidViewAccess", view_access: "pubic" },            // Invalid view_access
    { shname: "InvalidEditAccess", edit_access: 12345 },                     // Invalid edit_access
    { shname: "MissingLevelName", levels: [{}] },                            // Missing lvl_name in level
    { shname: "LongDescription", levels: [{ description: "a".repeat(256) }] }, // Description too long
    { shname: "InvalidAdditionalParams", levels: [{ additional_params: "should be object" }] }, // additional_params should be an object
    { shname: "NonArrayLevels", levels: "not an array" },                    // Levels should be an array
    { shname: "InvalidDisplayLevel", display_level: "first" },               // Display level should be a number
    { shname: "MissingRequiredField", levels: [{ fname: null }] },           // fname missing or null
    { shname: "InvalidDate", date_created: "yesterday" },                    // Invalid date format
    { shname: "EmptyLevels", levels: [] },                                   // Levels array cannot be empty
    { shname: "InvalidTypeForBool", is_DnD: "yes" },                         // Boolean expected, string provided
    { shname: "ArrayInDNDParams", levels: [{ DND_params: ["incorrect type"] }] }, // DND_params should be an object
    { shname: "InvalidID", _id: "id should not be changed at all" }
    ];
    const goodCharExamples = [{ shname: "Remark" },
    { "shname": "Basho", view_access: "private" },
    {
        "shname": "Pushkin", "display_level": 1, view_access: "private",
        levels: [{ lvl_name: "when born", fname: "Alexander Sergeevych PUSHKIN", sex: "male" }, { lvl_name: "early career ages", additional_params: { career: "writer" } }]
    },
    { shname: "Tolkien", view_access: "public" },
    { shname: "Hemingway", view_access: "public" },
    {
        shname: "Rowling", view_access: "public",
        levels: [
            { lvl_name: "early years", fname: "J.K. Rowling", main_color: "#123abc" },
            { lvl_name: "famous years", description: "Author of Harry Potter", additional_params: { notable_works: ["Harry Potter"] } }
        ]
    }
    ]
    const otherUserGoodCharExamples = [
        { shname: "carroll" },
        { shname: "Lovecraft", levels: [{ fname: "H.P. Lovecraft" }] },
        { shname: "Poe", view_access: "public", levels: [{ lvl_name: "poet years", description: "The Raven" }] }
    ];
    const goodUpdateExamples = [
        { view_access: "public" },                                  // Valid update
        { display_level: 2 },                                        // Valid update to change display level
        { levels: [{ lvl_name: "updated name", main_color: "#abcdef" }] }, // Valid update to levels]
        { edit_access: ["anotherUser"] }// Valid: update edit_access
    ]
    const badUpdateExamples = [
        { levels: [{ lvl_name: "", main_color: "#123abc" }] },       // Invalid: lvl_name is empty
        { levels: [{ main_color: "blue" }] },                        // Invalid: main_color format
        { view_access: "public_only" },                              // Invalid view_access value
        { levels: [{ additional_params: 12345 }] }                   // Invalid additional_params type]
    ]
    function expectCharacterStructure(char) {
        expect(char).toHaveProperty("shname");
        expect(char).toHaveProperty("_id");
        expect(char).toHaveProperty("host");
        expect(char).toHaveProperty("date_created");
        expect(char).toHaveProperty("date_modified");
        expect(char).toHaveProperty("view_access");
        expect(char).toHaveProperty("edit_access");
        expect(char).toHaveProperty("is_DnD");
        expect(char).toHaveProperty("display_level");
        expect(char).toHaveProperty("levels");
        expect(char.levels).toBeInstanceOf(Array);
        expect(char.levels.length).toBeGreaterThanOrEqual(1);

        const level = char.levels[0];
        expect(level).toHaveProperty("lvl_name");
        expect(level).toHaveProperty("fname");
        expect(level).toHaveProperty("img_url");
        expect(level).toHaveProperty("main_color");
        expect(level).toHaveProperty("description");
        expect(level).toHaveProperty("sex");
        expect(level).toHaveProperty("DND_params");
        expect(level.DND_params).toBeInstanceOf(Object);
        expect(level).toHaveProperty("additional_params");
        expect(level.additional_params).toBeInstanceOf(Object);

    }

    describe("POST /characters", () => {
        async function postCh(charBody) {
            return await request(app)
                .post("/gallery/characters")
                .set('Authorization', `Bearer ${editToken}`)
                .send(charBody);
        }
        it("201 Created", async () => {
            for (const char of goodCharExamples) {
                const res = await postCh(char);
                expect(res.status).toBe(201);
                expectCharacterStructure(res.body);
            }
            for (const char of otherUserGoodCharExamples) {
                const res = await request(app)
                    .post("/gallery/characters")
                    .set('Authorization', `Bearer ${editToken2}`)
                    .send(char);;
                expect(res.status).toBe(201);
                expectCharacterStructure(res.body);
            }
        });
        it("400 missing shname", async () => {
            for (const char of badCharExamples0) {
                const res = await postCh(char);
                expect(res.status).toBe(400);
            }
        })
        it("400 some of required fields are of invalid format", async () => {
            for (const char of badCharExamples1) {
                const res = await postCh(char);
                expect(res.status).toBe(400);
            }
        })
        it("401 unauthorised", async () => {
            const res = await request(app)
                .post("/gallery/characters")
                .send({ shname: "fname" });
            expect(res.status).toBe(401);
        })
        it("403 name taken", async () => {
            const res = await postCh(goodCharExamples[0]);
            expect(res.status).toBe(403);
        })
    })
    describe("DELETE /gallery/characters/:id", () => {
        async function deleteCh(charId) {
            return await request(app)
                .delete(`/gallery/characters/${charId}`)
                .set('Authorization', `Bearer ${editToken2}`);
        }

        it("204 No Content", async () => {
            const res = await deleteCh(`${userid2}_carroll`);
            expect(res.status).toBe(204);
        });

        it("404 Not Found", async () => {
            const res = await deleteCh(`${userid2}_carroll`);
            expect(res.status).toBe(404);
        });

        it("401 Unauthorized", async () => {
            const res = await request(app)
                .delete(`/gallery/characters/${userid}_pushkin`);
            expect(res.status).toBe(401);
        });

        it("403 Forbidden - other user's character", async () => {
            const res = await deleteCh(`${userid}_pushkin`); // char of a different user
            expect(res.status).toBe(403);
        });
    });
    describe("PUT /gallery/characters/:charID", () => {
        async function putCh(id, char) {
            return await request(app)
                .put(`/gallery/characters/${id}`)
                .set('Authorization', `Bearer ${editToken}`)
                .send(char);
        }

        it("200 OK for valid updates", async () => {
            for (const update of goodUpdateExamples) {
                const res = await putCh(`${userid}_pushkin`, update);
                expect(res.status).toBe(200);
                expectCharacterStructure(res.body);
            };
        });
        it("400 Invalid params", async () => {
            for (const update of badUpdateExamples) {
                const res = await putCh(`${userid}_pushkin`, update);
                expect(res.status).toBe(400);
            }
        });

        it("401 Unauthorized", async () => {
            const res = await request(app)
                .put(`/gallery/characters/${userid}_pushkin`)
                .send({ "shname": "Pushkin", "view_access": "private" });
            expect(res.status).toBe(401);
        });

        it("403 Forbidden", async () => {
            const res = await request(app)
                .put(`/gallery/characters/${userid}_pushkin`)
                .set('Authorization', `Bearer ${editToken2}`)
                .send({ "shname": "Pushkin", "view_access": "private" });
            expect(res.status).toBe(403);
        });

        it("404 Not Found", async () => {
            const res = await putCh(`${userid}_nonexistent`, { "shname": "Nonexistent" });
            expect(res.status).toBe(404);
        });
    });
    describe("GET /characters/:charID", () => {
        it("200 for public chars", async () => {
            const res = await request(app)
                .GET(`/gallery/characters/${userid}_pushkin`)
            expect(res.status).toBe(200);
            expectCharacterStructure(res.body)
        })
        it("200 for privateChars", async () => {
            const res = await request(app)
                .GET(`/gallery/characters/${userid}_Basho`)
                .set('Authorization', `Bearer ${viewToken}`);
            expect(res.status).toBe(200);
            expectCharacterStructure(res.body);
        })
        it("403 denied for private chars without proper authorization", async () => {
            const res = await request(app)
                .get(`/gallery/characters/${userid}_Basho`);
            expect(res.status).toBe(403);
        });

        it("404 for non-existent character", async () => {
            const res0 = await request(app)
                .get(`/gallery/characters/nonexistent`);
            expect(res0.status).toBe(404);
            for (const badch of badCharExamples1) {
                const res = await request(app)
                    .get(`/gallery/characters/${userid}_${badch.shname}`);
                expect(res.status).toBe(404);
            }
        });
    })
    describe("GET /gallery and /gallery/characters for same results", () => {
        it("200: expect result to be list of public characters", async () => {
            const res = await request(app)
                .get("/gallery");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("totalItems");
            res.body.items.forEach(char => {
                expectCharacterStructure(char);
            });
            //I also need to expect one of the results to be Pushkin and none to be Basho
            // Check that public character "Pushkin" is present
            const publicChar = res.body.items.find(char => char.shname === "Pushkin");
            expect(publicChar).toBeDefined();
            expectCharacterStructure(publicChar);

            // Check that private character "Basho" is absent
            const privateChar = res.body.items.find(char => char.shname === "Basho");
            expect(privateChar).toBeUndefined();
        });
        //404? don't know the fuck should happen for this to get 404, skip for now leave comment
    })
    describe("GET /gallery/characters/my", () => {
        it("200: return all personal created characters with view token", async () => {
            const res = await request(app)
                .get("/gallery/characters/my")
                .set('Authorization', `Bearer ${viewToken}`);
            expect(res.status).toBe(200);
            expect(res.body.items).toBeInstanceOf(Array);
            res.body.items.forEach(char => {
                expect(char.host).toBe(userid);
                expectCharacterStructure(char);
            });
            //need to expect res.body.items to have all the items from goodCharExamples and none other items, they might not be in the same order
            // Check that all items from goodCharExamples are present
            const createdCharNames = goodCharExamples.map(char => char.shname);
            const returnedCharNames = res.body.items.map(char => char.shname);

            // Ensure all created character names are present
            createdCharNames.forEach(name => {
                expect(returnedCharNames).toContain(name);
            });

            // Ensure no extra characters are present
            expect(returnedCharNames).toHaveLength(createdCharNames.length);

        });

        it("401: unauthorized without token", async () => {
            const res = await request(app)
                .get("/gallery/characters/my");
            expect(res.status).toBe(401);
        });
    });
    describe("GET /gallery/characters/user/:userid", () => {
        //300 redirect? like even if its you with your view token it should redirect to characters/my, but why bother ill add this later maybe leave comment and test commented out
        it("200: return only public characters of the user", async () => {
            const res = await request(app).get(`/gallery/characters/user/${userid}`);
            expect(res.status).toBe(200);
            expect(res.body.items).toBeInstanceOf(Array);

            // Ensure only public characters are returned
            res.body.items.forEach(char => {
                expect(char.view_access).toBe("public");
                expect(char.host).toBe(userid);
                expectCharacterStructure(char);
            });

            // Ensure a known private character is not returned
            const privateChar = res.body.items.find(char => char.shname === "Basho");
            expect(privateChar).toBeUndefined();
        });

        it("404: user has no public characters", async () => {
            const res = await request(app).get(`/gallery/characters/user/nonexistent_userid`);
            expect(res.status).toBe(404);
        });
    });
})
//#endregion


//#region auth logout delete
describe('delete user', () => {
    it('USER DELETE SUCCESS', async () => {
        const res = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer ${editToken}`);
        expect(res.statusCode).toBe(204);

        const res2 = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer ${editToken2}`);
        expect(res2.statusCode).toBe(204);
    })
    it('what was 200: Successful login now should be 404', async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ "username": username, "password": "newpassword", "email": "devtest-user@m.mail" });
        expect(res.statusCode).toBe(404);
    })
    it('USER DELETE 404', async () => {
        const res = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer ${editToken}`);
        expect(res.statusCode).toBe(404);
    })
})
//#endregion