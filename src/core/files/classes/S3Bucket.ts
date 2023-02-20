import { Endpoint, S3, Credentials } from 'aws-sdk';
import { SUPPORTED_ACL_TYPE } from '../enums/supported-acl-type.enum';

export abstract class S3Bucket {
    protected endpoint: Endpoint;
    protected s3: S3;
    protected credentials: Credentials;

    abstract upload(
        userId: number,
        file: Express.Multer.File,
        acl: SUPPORTED_ACL_TYPE,
    );

    abstract uploads(
        userId: number,
        files: Array<Express.Multer.File>,
        acl: SUPPORTED_ACL_TYPE,
    );

    abstract uploadPublic(userId: number, file: Express.Multer.File);
    abstract uploadPrivate(userId: number, file: Express.Multer.File);
    abstract uploadMultiPublic(userId: number, files: Array<Express.Multer.File>);

    abstract uploadMultiPrivate(
        userId: number,
        files: Array<Express.Multer.File>,
    );

    abstract delete(userId, files: Array<any>);
    abstract getS3(userId: number);
}
