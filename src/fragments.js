export const COMMENT_FRAGMENT = `
    fragment CommentPars on Comment {
        id
        text
        user {
            username
        }
    }
`;