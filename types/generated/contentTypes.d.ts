import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClienteCliente extends Schema.CollectionType {
  collectionName: 'clientes';
  info: {
    singularName: 'cliente';
    pluralName: 'clientes';
    displayName: 'cliente';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String & Attribute.Required & Attribute.Unique;
    tipoCliente: Attribute.Enumeration<['directo', 'consignacion']> &
      Attribute.Required;
    tipoDocIdentidad: Attribute.Enumeration<['cc', 'nit', 'pp']> &
      Attribute.Required;
    docIdentidad: Attribute.String & Attribute.Required & Attribute.Unique;
    fechaNacimiento: Attribute.Date;
    nombre1: Attribute.String & Attribute.Required;
    nombre2: Attribute.String;
    apellido1: Attribute.String & Attribute.Required;
    apellido2: Attribute.String;
    pais: Attribute.String & Attribute.Required;
    ciudad: Attribute.String & Attribute.Required;
    direccion: Attribute.String & Attribute.Required;
    cel: Attribute.String & Attribute.Required & Attribute.Unique;
    email: Attribute.Email & Attribute.Required & Attribute.Unique;
    categoriaCliente: Attribute.Enumeration<['standard', 'premium']> &
      Attribute.Required;
    ventasConsignacion: Attribute.Enumeration<['si', 'no']>;
    estado: Attribute.Enumeration<['activo', 'inactivo']> & Attribute.Required;
    numeroExpediente: Attribute.String & Attribute.Required;
    fechaCreacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cliente.cliente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cliente.cliente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmpleadoEmpleado extends Schema.CollectionType {
  collectionName: 'empleados';
  info: {
    singularName: 'empleado';
    pluralName: 'empleados';
    displayName: 'Empleado';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String;
    tipoDocIdentidad: Attribute.Enumeration<['cc', 'nit', 'pp']> &
      Attribute.Required;
    docIdentidad: Attribute.String & Attribute.Required & Attribute.Unique;
    fechaNacimiento: Attribute.Date;
    nombre1: Attribute.String & Attribute.Required;
    nombre2: Attribute.String;
    apellido1: Attribute.String & Attribute.Required;
    apellido2: Attribute.String;
    pais: Attribute.String & Attribute.Required;
    ciudad: Attribute.String & Attribute.Required;
    direccion: Attribute.String & Attribute.Required;
    cel: Attribute.String & Attribute.Required & Attribute.Unique;
    email: Attribute.Email & Attribute.Required & Attribute.Unique;
    webAccessAllowed: Attribute.Boolean;
    usuario: Attribute.String;
    password: Attribute.String;
    departamento: Attribute.Enumeration<['administracion', 'produccion']>;
    tipoContrato: Attribute.Enumeration<
      ['definido', 'indefinido', 'servicios']
    >;
    cargo: Attribute.Enumeration<
      ['auxiliar', 'analista', 'director', 'gerente']
    >;
    estado: Attribute.Enumeration<['activo', 'inactivo']> & Attribute.Required;
    numeroExpediente: Attribute.String & Attribute.Required;
    fechaCreacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::empleado.empleado',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::empleado.empleado',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInsumoProduccionInsumoProduccion
  extends Schema.CollectionType {
  collectionName: 'insumo_produccions';
  info: {
    singularName: 'insumo-produccion';
    pluralName: 'insumo-produccions';
    displayName: 'insumoProduccion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String & Attribute.Required & Attribute.Unique;
    grupoInterno: Attribute.Enumeration<
      [
        'fc01_orquideas',
        'fc02_anturios',
        'fc03_bromelias',
        'fc04_otras_plantas',
        'fc05_insumos_venta',
        'fc06_insumos_produccion',
        'fc07_otros_insumos'
      ]
    > &
      Attribute.Required;
    descripcion: Attribute.String & Attribute.Required;
    categoria: Attribute.Enumeration<
      ['materas', 'fertilizantes', 'marcacion', 'otros']
    > &
      Attribute.Required;
    cantidad: Attribute.BigInteger & Attribute.DefaultTo<0>;
    unidadMedida: Attribute.Enumeration<['un', 'gr', 'kg']>;
    estadoInterno: Attribute.Enumeration<
      ['inventario', 'resiembra', 'comercial', 'disponible', 'agotado']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'agotado'>;
    ubicacionBodega: Attribute.Enumeration<
      [
        'bodega_1',
        'bodega_2',
        'bodega_3',
        'bodega_4',
        'bodega_5',
        'bodega_6',
        'bodega_7',
        'bodega_8'
      ]
    >;
    ubicacionEstanteria: Attribute.Enumeration<
      [
        'estanteria_1',
        'estanteria_2',
        'estanteria_3',
        'estanteria_4',
        'estanteria_5',
        'estanteria_6',
        'estanteria_7',
        'estanteria_8',
        'estanteria_9',
        'estanteria_10'
      ]
    >;
    ubicacionZona: Attribute.Enumeration<
      [
        'zona_1',
        'zona_2',
        'zona_3',
        'zona_4',
        'zona_5',
        'zona_6',
        'zona_7',
        'zona_8',
        'zona_9',
        'zona_10',
        'zona_11'
      ]
    >;
    proveedor: Attribute.Relation<
      'api::insumo-produccion.insumo-produccion',
      'oneToOne',
      'api::proveedor.proveedor'
    > &
      Attribute.Required;
    fechaCreacion: Attribute.Date & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::insumo-produccion.insumo-produccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::insumo-produccion.insumo-produccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInsumoVentaInsumoVenta extends Schema.CollectionType {
  collectionName: 'insumo_ventas';
  info: {
    singularName: 'insumo-venta';
    pluralName: 'insumo-ventas';
    displayName: 'insumoVenta';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String & Attribute.Required & Attribute.Unique;
    grupoInterno: Attribute.Enumeration<
      [
        'fc01_orquideas',
        'fc02_anturios',
        'fc03_bromelias',
        'fc04_otras_plantas',
        'fc05_insumos_venta',
        'fc06_insumos_produccion',
        'fc07_otros_insumos'
      ]
    > &
      Attribute.Required;
    descripcion: Attribute.String & Attribute.Required;
    categoria: Attribute.Enumeration<
      ['materas', 'fertilizantes', 'marcacion', 'otros']
    > &
      Attribute.Required;
    cantidad: Attribute.BigInteger & Attribute.DefaultTo<0>;
    unidadMedida: Attribute.Enumeration<['un', 'gr', 'kg']>;
    estadoInterno: Attribute.Enumeration<
      ['inventario', 'resiembra', 'comercial', 'disponible', 'agotado']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'agotado'>;
    estadoComercial: Attribute.Enumeration<
      ['disponible', 'no-disponible', 'vendido', 'consignacion']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'no-disponible'>;
    estadoWeb: Attribute.Enumeration<['disponible', 'no disponible']> &
      Attribute.Required &
      Attribute.DefaultTo<'no-disponible'>;
    ubicacionBodega: Attribute.Enumeration<
      [
        'bodega_1',
        'bodega_2',
        'bodega_3',
        'bodega_4',
        'bodega_5',
        'bodega_6',
        'bodega_7',
        'bodega_8'
      ]
    >;
    ubicacionEstanteria: Attribute.Enumeration<
      [
        'estanteria_1',
        'estanteria_2',
        'estanteria_3',
        'estanteria_4',
        'estanteria_5',
        'estanteria_6',
        'estanteria_7',
        'estanteria_8',
        'estanteria_9',
        'estanteria_10'
      ]
    >;
    ubicacionZona: Attribute.Enumeration<
      [
        'zona_1',
        'zona_2',
        'zona_3',
        'zona_4',
        'zona_5',
        'zona_6',
        'zona_7',
        'zona_8',
        'zona_9',
        'zona_10',
        'zona_11'
      ]
    >;
    proveedor: Attribute.Relation<
      'api::insumo-venta.insumo-venta',
      'oneToOne',
      'api::proveedor.proveedor'
    > &
      Attribute.Required;
    fechaCreacion: Attribute.Date & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::insumo-venta.insumo-venta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::insumo-venta.insumo-venta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlantaPlanta extends Schema.CollectionType {
  collectionName: 'plantas';
  info: {
    singularName: 'planta';
    pluralName: 'plantas';
    displayName: 'planta';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String & Attribute.Required & Attribute.Unique;
    tipoOperacion: Attribute.Enumeration<['nuevo', 'migracion']> &
      Attribute.Required;
    grupoInterno: Attribute.Enumeration<
      [
        'fc01_orquideas',
        'fc02_anturios',
        'fc03_bromelias',
        'fc04_otras_plantas',
        'fc05_insumos_venta',
        'fc06_insumos_produccion',
        'fc07_otros_insumos'
      ]
    > &
      Attribute.Required;
    codigoInternoLVS: Attribute.String;
    genero: Attribute.String & Attribute.Required;
    especie: Attribute.String & Attribute.Required;
    descripcion: Attribute.String & Attribute.Required;
    costoUnitario: Attribute.BigInteger;
    precioVenta: Attribute.BigInteger;
    ultimaSiembra: Attribute.Date;
    plantaOrigen: Attribute.String;
    estadoInterno: Attribute.Enumeration<
      ['inventario', 'resiembra', 'comercial', 'agotado']
    > &
      Attribute.Required;
    estadoComercial: Attribute.Enumeration<
      ['disponible', 'no disponible', 'vendido', 'consignacion']
    > &
      Attribute.Required;
    estadoWeb: Attribute.Enumeration<['disponible', 'no disponible']> &
      Attribute.Required;
    ubicacionInvernadero: Attribute.Enumeration<
      [
        'invernadero_1',
        'invernadero_2',
        'invernadero_3',
        'invernadero_4',
        'invernadero_5',
        'invernadero_6',
        'invernadero_7',
        'invernadero_8'
      ]
    >;
    ubicacionCama: Attribute.Enumeration<
      [
        'cama_1',
        'cama_2',
        'cama_3',
        'cama_4',
        'cama_5',
        'cama_6',
        'cama_7',
        'cama_8',
        'cama_9',
        'cama_10'
      ]
    >;
    ubicacionZona: Attribute.Enumeration<
      [
        'zona_1',
        'zona_2',
        'zona_3',
        'zona_4',
        'zona_5',
        'zona_6',
        'zona_7',
        'zona_8',
        'zona_9',
        'zona_10',
        'zona_11'
      ]
    >;
    proveedor: Attribute.Relation<
      'api::planta.planta',
      'oneToOne',
      'api::proveedor.proveedor'
    > &
      Attribute.Required;
    cliente: Attribute.Relation<
      'api::planta.planta',
      'oneToOne',
      'api::cliente.cliente'
    >;
    fechaCreacion: Attribute.Date & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::planta.planta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::planta.planta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProveedorProveedor extends Schema.CollectionType {
  collectionName: 'proveedors';
  info: {
    singularName: 'proveedor';
    pluralName: 'proveedors';
    displayName: 'proveedor';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoInterno: Attribute.String & Attribute.Required & Attribute.Unique;
    tipoDocIdentidad: Attribute.Enumeration<['cc', 'nit', 'pp']> &
      Attribute.Required;
    docIdentidad: Attribute.String & Attribute.Required & Attribute.Unique;
    fechaNacimiento: Attribute.Date;
    nombre1: Attribute.String & Attribute.Required;
    nombre2: Attribute.String;
    apellido1: Attribute.String & Attribute.Required;
    apellido2: Attribute.String;
    pais: Attribute.String & Attribute.Required;
    ciudad: Attribute.String & Attribute.Required;
    direccion: Attribute.String & Attribute.Required;
    cel: Attribute.String & Attribute.Required & Attribute.Unique;
    email: Attribute.Email & Attribute.Required & Attribute.Unique;
    categoriaProveedor: Attribute.Enumeration<
      ['plantas', 'insumos', 'servicios']
    > &
      Attribute.Required;
    estado: Attribute.Enumeration<['activo', 'inactivo']> & Attribute.Required;
    numeroExpediente: Attribute.String & Attribute.Required;
    fechaCreacion: Attribute.Date & Attribute.Required;
    horaCreacion: Attribute.Time & Attribute.Required;
    fechaUltimaModificacion: Attribute.Date & Attribute.Required;
    horaModificacion: Attribute.Time & Attribute.Required;
    creadoPorUsuario: Attribute.String & Attribute.Required;
    modificadoPorUsuario: Attribute.String & Attribute.Required;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::proveedor.proveedor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::proveedor.proveedor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::cliente.cliente': ApiClienteCliente;
      'api::empleado.empleado': ApiEmpleadoEmpleado;
      'api::insumo-produccion.insumo-produccion': ApiInsumoProduccionInsumoProduccion;
      'api::insumo-venta.insumo-venta': ApiInsumoVentaInsumoVenta;
      'api::planta.planta': ApiPlantaPlanta;
      'api::proveedor.proveedor': ApiProveedorProveedor;
    }
  }
}
