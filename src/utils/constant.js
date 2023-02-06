export const messagesLogin = (input) => {
    const { required, min } = input;
    return {
        required: `${required} email is required`,
        minLength: `${required} must have at least ${min} characters`,
    };
};

export const productType = {
    phanBon: 'phanBon',
    baoVeThucVat: 'baoVeThucVat',
};

export const menuStructure = [
    { id: 1, name: 'Phân bón', parentId: 1 },
    { id: 2, name: 'Phân bón lá', parentId: 1 },
    { id: 3, name: 'Phân bón gốc', parentId: 1 },
    { id: 4, name: 'Thuốc bảo vệ thực vật', parentId: 4 },
    { id: 6, name: 'Thuốc trừ sâu', parentId: 4 },
    { id: 7, name: 'Thuốc trừ nấm', parentId: 4 },
    { id: 8, name: 'Thuốc diệt cỏ', parentId: 4 },
];

export const home = [
    { id: 1, name: 'phan bon', parentId: 1 },
    { id: 2, name: 'phan bon la', parentId: 1 },
    { id: 3, name: 'phan bon goc', parentId: 1 },
];

export const phanBon = [
    { id: 1, name: 'phan bon', parentId: 1 },
    { id: 2, name: 'phan bon la', parentId: 1 },
    { id: 3, name: 'phan bon goc', parentId: 1 },
];

export const thuocBaoVeThucVat = [
    { id: 4, name: 'thuoc bao ve thuc vat', parentId: 4 },
    { id: 6, name: 'thuoc tru sau', parentId: 4 },
    { id: 7, name: 'thuoc tru nam', parentId: 4 },
    { id: 8, name: 'thuoc diet co', parentId: 4 },
];

export const pagingConstant = {
    productPerPage: 16,
};
