import { Draft, Draft07, JsonError, JsonSchema } from "json-schema-library";
import { errorRes, sha256, } from "../resources/util";
import { MongooseError } from "mongoose";
import { Response } from "express";

const runSafely = async (res: Response, fn: () => Promise<void>) => {
    try {
        await fn();
    }
    catch (e) {
        if (e instanceof MongooseError) {
            errorRes(res, { code: "SERVER_ERROR", message: e.message, errors: (e as any).errors });
        } else {
            errorRes(res, { code: "SERVER_ERROR", message: (e as Error).message, errors: {} });
        }
        console.log(e);
    }
}

const validateSchemaAndRunSafely = async (res: Response, { object, schema }: { object: Object, schema: JsonSchema }, fn: () => Promise<void>) => {
    const jsonSchema: Draft = new Draft07(schema);
    const errors: JsonError[] = jsonSchema.validate(object);

    if (errors.length === 0) {
        await runSafely(res, fn);
    } else {
        errorRes(res, { code: "SCHEMA_ERROR", message: "Bad schema. The requst body does not follow specified schema.", errors: errors });
    }
}

export { runSafely, validateSchemaAndRunSafely }