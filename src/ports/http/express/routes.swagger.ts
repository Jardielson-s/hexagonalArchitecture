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
 *    EmailAlreadyExists:
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