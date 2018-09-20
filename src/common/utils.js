const properties = {
    lock: {
        collectionName: 'locks',
        fields: {
            custom_name: {
                type: 'string',
                translation: 'Namn'
            },
            location: {
                type: 'string',
                translation: 'Platsbeskrivning'
            },
            port_id: {
                type: 'number',
                translation: 'Port-ID'
            },
            street: {
                type: "string",
                translation: "Gata"
            },
            city: {
                type: "string",
                translation: "Stad"
            },
            zip: {
                type: "string",
                translation: "Postnummer"
            },
            doors: {
                type: 'array',
                translation: 'Dörrar',
                fields: {
                    id: {
                        type: 'string',
                        translation: 'id'
                    },
                    port_id: {
                        type: 'string',
                        translation: 'Port'
                    },
                    display_name: {
                        type: 'string',
                        translation: 'Visningsnamn'
                    },
                    allocation: {
                        type: 'object',
                        translation: 'Allokering',
                        fields: {
                            easy_access: { type: 'ref', translation: 'Gästnyckel' },
                            delivery: { type: 'ref', entity: 'delivery', translation: 'Leverans' },
                            retur: { type: 'ref', entity: 'retur', translation: 'Retur' }
                        }
                    },
                    controller_index: {
                        type: 'string',
                        translation: 'controller_index'
                    },
                    dimensions: {
                        type: 'array',
                        translation: 'Storlek'
                    }
                }
            }
        }
    },
    controller: {
        collectionName: 'controllers',
        fields: {
            open_duration: {
                type: 'number',
                translation: 'Öppningstid (millisekunder)'
            },
            accessid: {
                type: 'string',
                translation: 'Qlocx ID'
            }
        }
    },
    admin: {
        collectionName: 'admins',
        fields: {
            name: {
                type: 'string',
                translation: 'Namn'
            }
        }
    }
}

const translations = {
    easy_access: 'Gästnyckel',
    delivery: 'Leverans',
    retur: 'Retur',
    created: 'Skapad',
    unlimited_uses: 'Obegränsat med användningar',
    target: 'Mottagare',
    false: 'Nej',
    true: 'Ja'
}

export const getProperty = (entity, key) => {
    if (!key) return ''
    let str = properties[entity].fields[key] || key
    return str
}

export const translate = (str) => {
    return translations[str] || str
}

export const getCollectionName = (entity) => {
    return properties[entity].collectionName
}
