/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: User email
 *      example:
 *        name: Joe Doe
 *        email: joeDoe@gmail.com
 *    ResponseMutationUser:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - email
 *        - createdAt
 *        - updatedAt
 *        - deletedAt
 *      properties:
 *        id:
 *          type: string
 *          description: User id
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: User email
 *        createdAt:
 *          type: string
 *          description: User created
 *        updatedAt:
 *          type: string
 *          description: User updated
 *        deletedAt:
 *          type: string
 *          description: User deledted
 *      example:
 *        id: 2f976769-fb80-4ea8-9249-8f49ea259a76
 *        name: Joe Doe
 *        email: joeDoe@gmail.com
 *        createdAt: 2023-04-08T22:57:55.047Z
 *        updatedAt: 2023-04-08T22:57:55.047Z
 *        deleledAt: null
 *    EmailAlreadyExists:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *    UserNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *    FieldInvalid:
 *      type: object
 *      properties:
 *        error:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              field:
 *                type: string
 *              message:
 *                type: string
 */

/**
 * @swagger
 * tags:
 *  name: Health Check System
 *  description: Status System
 */

/**
 * @swagger
 * /health-check:
 *  get:
 *    summary: Retuen Server
 *    tags: [Health Check System]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: HEALTH CHECK OK
 *      500:
 *           description: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managin api
 */
/**
 * @swagger
 * /user:
 *  post:
 *    summary: Create User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/EmailAlreadyExists'
 *               - $ref: '#/components/schemas/FieldInvalid'
 *            examples:
 *               EmailAlreadyExists:
 *                 summary: An example of EmailAlreadyExists
 *                 value:
 *                   message: Email already exists
 *               FieldInvalid:
 *                 summary: an example of FieldInvalid
 *                 value:
 *                   error: [{ "field": "name", "message": "String must contain at least 1 character(s)"}, { "field": "email", "message": "Email invalid format" }]
 */
/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update User
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: 'id'
 *       required: true
 *       schema:
 *         type: string
 *         example: 2f976769-fb80-4ea8-9249-8f49ea259a76
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseMutationUser'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/EmailAlreadyExists'
 *                - $ref: '#/components/schemas/FieldInvalid'
 *                - $ref: '#/components/schemas/UserNotFound'
 *             examples:
 *               EmailAlreadyExists:
 *                 summary: An example of EmailAlreadyExists
 *                 value:
 *                   message: Email already exists
 *               FieldInvalid:
 *                 summary: an example of FieldInvalid
 *                 value:
 *                   error: [{ "field": "name", "message": "String must contain at least 1 character(s)"}, { "field": "email", "message": "Email invalid format" }]
 *               UserNotFound:
 *                 summary: an example userNotFoundError
 *                 value:
 *                   message: User not found
 */

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    description: Find User By Id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: 'id'
 *        required: true
 *        schema:
 *          type: string
 *          example: 1239189f-e00d-4484-b408-a9f92a54e0ee
 *    responses:
 *      200:
 *        describe: find user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/User'
 *                - $ref: '#/components/schemas/UserNotFound'
 *                - $ref: '#/components/schemas/FieldInvalid'
 *            examples:
 *               User:
 *                  summary: user found
 *                  value: { "id": "1239189f-e00d-4484-b408-a9f92a54e0ee", "name": "Joe Doe", "email": "joe@gmail.com", "createdAt": "2023-04-10T22:12:20.852Z", "updatedAt": "2023-04-10T22:12:20.852Z", "deletedAt": null }
 *               UserNotFound:
 *                  summary: user not found
 *                  value: 
 *                     message: 'userNotFound'
 *               FieldInvalid:
 *                  summary: user id invalid
 *                  value: { "error": [ { "field": "id", "message": "Invalid uuid" } ] }
 *    
 */