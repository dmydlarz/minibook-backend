export enum SUPPORTED_ACL_TYPE {
    PRIVATE = 'private',
    PUBLIC_READ = 'public-read',
    PUBLIC_READ_WRITE = 'public-read-write',
    AUTHENTICATED_READ = 'authenticated-read',
    AWS_EXEC_READ = 'aws-exec-read',
    BUCKET_OWNER_READ = 'bucket-owner-read',
    BUCKET_OWNER_FULL_CONTROL = 'bucket-owner-full-control',
};