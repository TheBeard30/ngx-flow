export interface IGraphCommand {
  /**
   * A unique identifier of this command.
   */
  id: string;
  /**
   * A label of this command.
   */
  label?: string;
  /**
   * An icon class of this command.
   */
  iconName?: string;
  /**
   * A category of this command.
   */
  category?: string;
}

export interface ICommandFactory<Args = any> {
  createCommand: (commandId: string, args: Args, hooks?) => any;
}
