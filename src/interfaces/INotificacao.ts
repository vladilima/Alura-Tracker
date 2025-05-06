export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    AVISO
}

export interface INotificacao {
    titulo: string
    texto: string
    tipo: TipoNotificacao
    id: number
}