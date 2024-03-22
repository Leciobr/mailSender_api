export type ScheduleEmailPayload = {
    loggedUser: any,
    user: string
    token: string
    idMassa: string
    priority: number
    interval: number
    emailMsg: string
    emailSubject: string
    emailAttachment: string
    variables: {
      [key: string]: string
    },
    emails: {
        email: string
        attachment: string  
    }[],
    SMTP: {
        nome: string
        email: string
        user: string
        pwd: string
        smtp: string
        port: number
        encryption: string
        auth: string
        emailReply: string
    }
}

export type AddUserPayload = {
    user: string
    nivel: string
    password: string
}

export enum Statuses { 
    PENDING = 'a_enviar',
    SENT = 'enviado',
    SENT_WITH_ERRORS = 'enviado_com_erro',
    ERROR = 'erro',
}

export enum Nivels {
    ADMIN = 'admin',
    USER = 'user',
}

export enum EmailStatus { 
    PENDING = 'a_enviar',
    SENT = 'enviado',
    ERROR = 'erro',
}