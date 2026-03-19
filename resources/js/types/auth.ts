export type User = {
    id: number;
    name: string;
    email: string;
    role: 'employee' | 'evaluator' | 'hr-personnel';
    employee_id?: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type NotificationItem = {
    id: number;
    type: string;
    title: string;
    message: string;
    documentType: string | null;
    documentId: number | null;
    isRead: boolean;
    isImportant: boolean;
    time: string;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
