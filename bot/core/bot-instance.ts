export class BotInstance {
  public static instance: BotInstance;

  private constructor() {}

  public static getInstance(): BotInstance {
    if (!BotInstance.instance) {
      BotInstance.instance = new BotInstance();
    }
    return BotInstance.instance;
  }
}
