/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: User name
 *      example:
 *        name: Joe Doe
 */

/**
 * @swagger
 * /health-check:
 *  get:
 *    summary: Retuen Server
 *    responses:
 *      200:
 *        description: Status server
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: HEALTH CHECK OK
 */
