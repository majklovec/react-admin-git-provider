import { getToken } from "./authToken";
import {
  Params,
  EntityProvider,
  ListParams,
  GetOneParams,
  GetManyParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  DeleteManyParams,
} from "./EntityProvider";

export const dataProvider = ({
  projectId,
  ref,
  basePath,
  gitlabOptions,
}: {
  projectId: string;
  ref: string;
  basePath: string;
  gitlabOptions: { host: string };
}) => async (type: string, resource: string, params: Params) => {
  const oauthToken = getToken() || undefined
  if (!oauthToken) {
    throw new Error('User is not logged.')
  }

  const entityProvider = new EntityProvider(
    {
      ...gitlabOptions,
      oauthToken,
    },
    projectId,
    ref,
    basePath,
  );

  switch (type) {
    case "GET_LIST":
      return entityProvider.getList(params as ListParams);

    case "GET_ONE":
      return entityProvider.getOne(params as GetOneParams);

    case "GET_MANY":
      return entityProvider.getMany(params as GetManyParams);

    case "CREATE":
      return entityProvider.create(params as CreateParams);

    case "UPDATE":
      return entityProvider.update(params as UpdateParams);

    case "UPDATE_MANY":
      throw new Error("TO IMPLEMENT");

    case "DELETE":
      return entityProvider.delete(params as DeleteParams);

    case "DELETE_MANY":
      return entityProvider.deleteMany(params as DeleteManyParams);

    case "GET_MANY_REFERENCE":
      throw new Error("TO IMPLEMENT");

    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
};
