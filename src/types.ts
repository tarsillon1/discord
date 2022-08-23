export enum PremiumType {
  None = 0,
  NitroClassic = 1,
  Nitro = 2,
}

export enum UserFlagType {
  /**
   * Discord Employee.
   */
  Staff = 1,

  /**
   * Partnered Server Owner.
   */
  Partner = 2,

  /**
   * HypeSquad Events Member.
   */
  HyperSquad = 4,

  BugHunterLevel1 = 8,

  /**
   * House Bravery Member.
   */
  HyperSquadOnlineHouse1 = 64,

  /**
   * House Brilliance Member.
   */
  HyperSquadOnlineHouse2 = 128,

  /**
   * House Balance Member.
   */
  HyperSquadOnlineHouse3 = 256,

  /**
   * Early Nitro Supporter.
   */
  PremiumEarlySupporter = 512,

  /**
   * User is a team.
   * For more information: https://discord.com/developers/docs/topics/teams
   */
  TeamPseudoUser = 1024,
  BugHunterLevel2 = 16384,
  VerifiedBot = 65536,

  /**
   * Early Verified Bot Developer.
   */
  VerifiedDeveloper = 131072,

  /**
   * Discord Certified Moderator.
   */
  CertifiedModerator = 262144,

  /**
   * Bot uses only HTTP interactions and is shown in the online member list.
   */
  BotHTTPInteractions = 524288,
}

export interface User {
  id: string;
  email?: string;

  /**
   * The user's username, not unique across the platform.
   */
  username: string;

  /**
   * The user's 4-digit discord-tag.
   */
  discriminator: string;

  /**
   * The user's avatar hash.
   * For more information: https://discord.com/developers/docs/reference#image-formatting
   */
  avatar: string;

  /**
   * whether the user belongs to an OAuth2 application.
   */
  bot?: boolean;

  /**
   * Whether the user is an Official Discord System user (part of the urgent message system).
   */
  system?: boolean;

  /**
   * Whether the user has two factor enabled on their account.
   */
  mfa_enabled?: boolean;

  /**
   * The user's banner hash.
   * For more information: https://discord.com/developers/docs/reference#image-formatting
   */
  banner?: string;

  /**
   * The user's banner color encoded as an integer representation of hexadecimal color code.
   */
  accent_color?: number;

  /**
   * The user's chosen language option.
   * For more information: https://discord.com/developers/docs/reference#locales
   */
  locale?: string;

  /**
   * Whether the email on this account has been verified.
   */
  verified?: boolean;

  /**
   * The type of Nitro subscription on a user's account.
   */
  premium_type?: PremiumType;

  /**
   * The flags on a user's account.
   */
  flags?: UserFlagType;

  /**
   * The public flags on a user's account.
   */
  public_flags?: UserFlagType;
}

export interface GuildMember {
  user?: User;

  /**
   * This user's guild nickname.
   */
  nick?: string;

  /**
   * The member's guild avatar hash.
   */
  avatar?: string;

  /**
   * Array of role object ids.
   */
  roles: string[];

  /**
   * ISO8601 timestamp when the user joined the guild.
   */
  joined_at: string;

  /**
   * ISO8601 timestamp when the user started boosting the guild.
   */
  premium_since?: string;

  /**
   * Whether the user is deafened in voice channels.
   */
  deaf: boolean;

  /**
   * Whether the user is muted in voice channels.
   */
  mute: boolean;

  /**
   * Whether the user has not yet passed the guild's Membership Screening requirements.
   */
  pending?: boolean;

  /**
   * Total permissions of the member in the channel, including overwrites, returned when in the interaction object.
   */
  permissions?: boolean;

  /**
   * When the user's timeout will expire and the user will be able to communicate in the guild again,
   * null or a time in the past if the user is not timed out.
   */
  communication_disabled_until?: string;
}

export enum TeamMembershipState {
  Invited = 1,
  Accepted = 2,
}

export interface TeamMember {
  user: User;
  team_id: string;
  permissions: string[];
  membership_state: TeamMembershipState;
}

export interface Team {
  id: string;
  name: string;
  owner_user_id: string;
  members: TeamMember[];

  /**
   * A hash of the image of the team's icon.
   */
  icon?: string;
}

export enum OAuth2Scope {
  /**
   * Allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval.
   */
  ActivitiesRead = "activities.read",

  /**
   * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER).
   */
  ActivitiesWrite = "activities.write",

  /**
   * Allows your app to read build data for a user's applications.
   */
  ActivitiesBuildRead = "applications.builds.read",

  /**
   * Allows your app to upload/update builds for a user's applications - requires Discord approval.
   */
  ActivitiesBuildUploads = "applications.builds.upload",

  /**
   * Allows your app to use commands in a guild.
   */
  ApplicationCommands = "applications.commands",

  /**
   * Allows your app to update its commands using a Bearer token - client credentials grant only.
   */
  ApplicationCommandsUpdate = "applications.commands.update",

  /**
   * Allows your app to update permissions for its commands in a guild a user has permissions to.
   */
  ApplicationCommandsPermissionsUpdate = "applications.commands.permissions.update",

  /**
   * Allows your app to read entitlements for a user's applications.
   */
  ApplicationEntitlement = "applications.entitlements",

  /**
   * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications.
   */
  ApplicationsStoreUpdate = "applications.store.update",

  /**
   * For oauth2 bots, this puts the bot in the user's selected guild by default.
   */
  Bot = "bot",

  /**
   * Allows /users/@me/connections to return linked third-party accounts.
   */
  Connections = "connections",

  /**
   * Allows your app to see information about the user's DMs and group DMs - requires Discord approval.
   */
  DMChannelsRead = "dm_channels.read",

  /**
   * Enables /users/@me to return an email.
   */
  Email = "email",

  /**
   * Allows your app to join users to a group dm.
   */
  GDMJoin = "gdm.join",

  /**
   * Allows /users/@me/guilds to return basic information about all of a user's guilds.
   */
  Guilds = "guilds",

  /**
   * Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild.
   */
  GuildsJoin = "guilds.join",

  /**
   * Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild.
   */
  GuildMembersRead = "guilds.members.read",

  /**
   * Allows /users/@me without email.
   */
  Identify = "identify",

  /**
   * For local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates).
   */
  MessagesRead = "messages.read",

  /**
   * Allows your app to know a user's friends and implicit relationships - requires Discord approval.
   */
  RelationshipsRead = "relationships.read",

  /**
   * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval.
   */
  Rpc = "rpc",

  /**
   * For local rpc server access, this allows you to update a user's activity - requires Discord approval.
   */
  RpcActivitiesWrite = "rpc.activities.write",

  /**
   * For local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval.
   */
  RpcNotificationsRead = "rpc.notifications.read",

  /**
   * For local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval.
   */
  RpcVoiceRead = "rpc.voice.read",

  /**
   * For local rpc server access, this allows you to update a user's voice settings - requires Discord approval.
   */
  RpcVoiceWrite = "rpc.voice.write",

  /**
   * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval.
   */
  Voice = "voice",

  /**
   * This generates a webhook that is returned in the oauth token response for authorization code grants
   */
  WebhookIncoming = "webhook.incoming",
}

export interface InstallParams {
  scopes: OAuth2Scope[];

  /**
   * The permissions to request for the bot role.
   */
  permissions: string;
}

export enum ApplicationFlag {
  /**
   * Intent required for bots in 100 or more servers to receive presence_update events.
   */
  GatewayPresence = 4096,

  /**
   * Intent required for bots in under 100 servers to receive presence_update events, found in Bot Settings.
   */
  GatewayPresenceLimited = 8192,

  /**
   * Intent required for bots in 100 or more servers to receive member-related events like guild_member_add. See list of member-related events under GUILD_MEMBERS.
   */
  GatewayGuildMembers = 16384,

  /**
   * Intent required for bots in under 100 servers to receive member-related events like guild_member_add, found in Bot Settings. See list of member-related events under GUILD_MEMBERS.
   */
  GatewayGuildMembersLimited = 32768,

  /**
   * Indicates unusual growth of an app that prevents verification.
   */
  VerificationPendingGuildLimit = 65536,

  /**
   * Indicates if an app is embedded within the Discord client (currently unavailable publicly).
   */
  Embedded = 131072,

  /**
   * Intent required for bots in 100 or more servers to receive message content.
   */
  GatewayMessageContent = 262144,

  /**
   * Intent required for bots in under 100 servers to receive message content, found in Bot Settings.
   */
  GatewayMessageContentLimited = 524288,
}

export interface Application {
  id: string;
  name: string;
  description: string;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner: User;

  /**
   * The hex encoded key for verification in interactions and the GameSDK's GetTicket.
   */
  verify_key: string;

  team?: Team;

  /**
   * When false only app owner can join the app's bot to guilds.
   */
  bot_public: boolean;

  /**
   * When true the app's bot will only join upon completion of the full oauth2 code grant flow.
   */
  bot_require_code_grant: boolean;

  /**
   * The icon hash of the app.
   * For more information: https://discord.com/developers/docs/reference#image-formatting
   */
  icon: string;

  /**
   * An array of rpc origin urls, if rpc is enabled.
   */
  rpc_origins?: string[];

  /**
   * If this application is a game sold on Discord, this field will be the guild to which it has been linked.
   */
  guild_id?: string;

  /**
   * if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists.
   */
  primary_sku_id?: string;

  /**
   * If this application is a game sold on Discord, this field will be the URL slug that links to the store page.
   */
  slug?: string;

  /**
   * The application's default rich presence invite cover image hash.
   * For more information: https://discord.com/developers/docs/reference#image-formatting
   */
  cover_image?: string;

  /**
   * The application's public flags.
   */
  flags?: ApplicationFlag;

  /**
   * Up to 5 tags describing the content and functionality of the application.
   */
  tags?: string[];

  /**
   * Settings for the application's default in-app authorization link, if enabled.
   */
  install_params?: InstallParams;

  /**
   * The application's default custom authorization link, if enabled.
   */
  custom_install_url?: string;
}

export interface Reaction {
  emoji: Emoji;

  /**
   * Times this emoji has been used to react.
   */
  count: number;

  /**
   * Whether the current user reacted using this emoji.
   */
  me: boolean;
}

export interface ThreadMember {
  user_id?: string;

  /**
   * The id of the thread.
   */
  id?: string;

  /**
   * ISO8601 timestamp	the time the current user last joined the thread.
   */
  join_timestamp: string;

  /**
   * Any user-thread settings, currently only used for notifications.
   */
  flags: number;
}

export interface ThreadMetadata {
  archived: boolean;

  /**
   * ISO8601 timestamp when the thread was created; only populated for threads created after 2022-01-09.
   */
  create_timestamp?: string;

  /**
   * Whether non-moderators can add other non-moderators to a thread; only available on private threads.
   */
  invitable?: boolean;

  /**
   * Whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it.
   */
  locked: boolean;

  /**
   * Duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080.
   */
  auto_archive_duration: number;

  /**
   * ISO8601 timestamp when the thread's archive status was last changed, used for calculating recent activity.
   */
  archive_timestamp: string;
}

export enum ChannelType {
  /**
   * A text channel within a server.
   */
  GuildText = 0,

  /**
   * A direct message between users.
   */
  DM = 1,

  /**
   * A voice channel within a server.
   */
  GuildVoice = 2,

  /**
   * A direct message between multiple users.
   */
  GroupDM = 3,

  /**
   * An organizational category that contains up to 50 channels.
   * For more information: https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101
   */
  GuildCategory = 4,

  /**
   * A channel that users can follow and crosspost into their own server.
   * For more information: https://support.discord.com/hc/en-us/articles/360032008192
   */
  GuildNews = 5,

  /**
   * A temporary sub-channel within a GUILD_NEWS channel.
   */
  GuildNewsThread = 10,

  /**
   * A temporary sub-channel within a GUILD_TEXT channel.
   */
  GuildPublicThread = 11,

  /**
   * A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission.
   */
  GuildPrivateThread = 12,

  /**
   * A voice channel for hosting events with an audience.
   * For more information: https://support.discord.com/hc/en-us/articles/1500005513722
   */
  GuildStageVoice = 13,

  /**
   * The channel in a hub containing the listed servers.
   * For more information: https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ
   */
  GuildDirectory = 14,

  /**
   * (still in development) a channel that can only contain threads.
   */
  GuildForum = 15,
}

export interface ChannelMention {
  id: string;
  guild_id: string;
  type: ChannelType;
  name: string;
}

export enum VideoQualityMode {
  /**
   * Discord chooses the quality for optimal performance.
   */
  Auto = 1,

  /**
   * 720p
   */
  Full = 2,
}

export enum ChannelFlag {
  /**
   * This thread is pinned to the top of its parent forum channel.
   */
  Pinned = 2,
}

export interface Channel {
  id: string;
  type: ChannelType;
  name?: string;
  topic?: string;
  last_message_id?: string;
  nsfw?: boolean;
  user_limit?: number;
  recipients?: User[];
  icon?: string;
  owner_id?: string;
  message_count?: number;
  member_count?: number;

  flags?: ChannelFlag;

  /**
   * Thread-specific fields not needed by other channels.
   */
  thread_metadata?: ThreadMetadata;

  /**
   * Thread member object for the current user, if they have joined the thread, only included on certain API endpoints.
   */
  member?: ThreadMember;

  /**
   * Default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080.
   */
  default_auto_archive_duration: number;

  /**
   * Number of messages ever sent in a thread, it's similar to message_count on message creation, but will not decrement the number when a message is delete.
   */
  total_message_sent?: number;

  /**
   * Computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction.
   */
  permissions?: string;

  /**
   * The camera video quality mode of the voice channel, 1 when not present.
   */
  video_quality_mode?: VideoQualityMode;

  /**
   * Voice region id for the voice channel, automatic when set to null.
   */
  rtc_region?: string;

  /**
   * ISO8601 timestamp	when the last pinned message was pinned.
   * This may be null in events such as GUILD_CREATE when a message is not pinned.
   */
  last_pin_timestamp?: string;

  /**
   * For guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created.
   */
  parent_id?: string;

  /**
   * Application id of the group DM creator if it is bot-created.
   */
  application_id?: string;

  /**
   * amount of seconds a user has to wait before sending another message (0-21600);
   * bots, as well as users with the permission manage_messages or manage_channel, are unaffected.
   */
  rate_limit_per_user?: number;

  /**
   * The bitrate (in bits) of the voice channel.
   */
  bitrate?: number;

  /**
   * ID of the guild containing the channel.
   */
  guild_id?: string;
}

export enum MessageActivityType {
  Join = 1,
  Spectate = 2,
  Listen = 3,
  JoinRequest = 4,
}

export interface MessageActivity {
  type: MessageActivityType;

  /**
   * party_id from a Rich Presence event.
   */
  party_id?: string;
}

export interface MessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;

  /**
   * When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true.
   */
  fail_if_not_exists?: boolean;
}

export interface MessageInteraction {
  id: string;
  user: User;
  member?: GuildMember;
  name: string;
  type: InteractionCallbackType;
}

export enum StickerFormat {
  Png = 1,
  Apng = 2,
  Lottle = 3,
}

export interface MessageStickerItem {
  id: string;
  name: string;
  format_type: StickerFormat;
}

export enum MessageFlag {
  /**
   * This message has been published to subscribed channels (via Channel Following).
   */
  Crossposted = 1,

  /**
   * This message originated from a message in another channel (via Channel Following).
   */
  IsCrossposted = 2,

  /**
   * Do not include any embeds when serializing this message.
   */
  SuppressEmbeds = 4,

  /**
   * The source message for this crosspost has been deleted (via Channel Following).
   */
  SourceMessageDeleted = 8,

  /**
   * This message came from the urgent message system.
   */
  Urgent = 16,

  /**
   * This message has an associated thread, with the same id as the message.
   */
  HasThread = 32,

  /**
   * This message is only visible to the user who invoked the Interaction.
   */
  Ephemeral = 64,

  /**
   * This message is an Interaction Response and the bot is "thinking".
   */
  Loading = 128,

  /**
   * This message failed to mention some roles and add their members to the thread.
   */
  FailedToMentionSomeRolesInThread = 256,
}

export enum MessageType {
  Default = 0,
  RecipientAdd = 1,
  RecipientRemove = 2,
  Call = 3,
  ChannelNameChange = 4,
  ChannelIconChange = 5,
  ChannelPinnedMessage = 6,
  UserJoin = 7,
  GuildBoost = 8,
  GuildBoostTier1 = 9,
  GuildBoostTier2 = 10,
  GuildBoostTier3 = 11,
  ChannelFollowAdd = 12,
  GuildDiscoveryDisqualified = 14,
  GuildDiscoveryRequalified = 15,
  GuildDiscoveryGracePeriodInitialWarning = 16,
  GuildDiscoveryGracePeriodFinalWarning = 17,
  ThreadCreated = 18,
  Reply = 19,
  ChatInputCommand = 20,
  ThreadStarterMessage = 21,
  GuildInviteReminder = 22,
  ContextMenuCommand = 23,
  AutoModerationAction = 24,
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  attachments: Attachment[];
  embeds: Embed[];
  reactions?: Reaction[];

  /**
   * ISO8601 timestamp when this message was sent.
   */
  timestamp: string;

  /**
   * ISO8601 timestamp	when this message was edited (or null if never).
   */
  edited_timestamp: string;

  /**
   * Whether this was a TTS message.
   */
  tts: boolean;

  /**
   * Whether this message mentions everyone.
   */
  mention_everyone: boolean;

  /**
   * ID of the channel the message was sent in.
   */
  channel_id: string;

  /**
   * Users specifically mentioned in the message.
   */
  mentions: User[];

  /**
   * Roles specifically mentioned in this message.
   */
  mention_roles: string[];

  /**
   * Channels specifically mentioned in this message.
   */
  mention_channels?: ChannelMention[];

  /**
   * The author of this message (not guaranteed to be a valid user, see below).
   */
  author: User;

  /**
   * whether this message is pinned
   */
  pinned: boolean;

  /**
   * Used for validating a message was sent.
   */
  nonce?: string | number;

  /**
   * If the message is generated by a webhook, this is the webhook's id.
   */
  webhook_id?: string;

  /**
   * Sent with Rich Presence-related chat embeds.
   */
  activity?: MessageActivity;

  /**
   * Sent with Rich Presence-related chat embeds.
   */
  application?: Application;

  /**
   * If the message is an Interaction or application-owned webhook, this is the id of the application.
   */
  application_id?: string;

  /**
   * Data showing the source of a crosspost, channel follow add, pin, or reply message.
   */
  message_reference?: MessageReference;

  /**
   * The message associated with the message_reference.
   */
  referenced_message?: Message;

  flags?: MessageFlag;

  /**
   * Sent if the message is a response to an Interaction.
   */
  interaction?: MessageInteraction;

  thread?: Channel;

  /**
   * Sent if the message contains components like buttons, action rows, or other interactive components.
   */
  components?: MessageComponent[];

  /**
   * Sent if the message contains stickers.
   */
  sticker_items?: MessageStickerItem[];

  /**
   * A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread,
   * it can be used to estimate the relative position of the messsage in a thread in company with total_message_sent on parent thread.
   */
  position?: number;
}

export interface ApplicationCommandOption {
  name: string;
  required?: boolean;
  description: string;
  type: ApplicationCommandOptionType;

  /**
   * Choices for STRING, INTEGER, and NUMBER types for the user to pick from, max 25.
   */
  choices?: ApplicationCommandChoice[];

  /**
   * If the option is a subcommand or subcommand group type, these nested options will be the parameters.
   */
  options?: ApplicationCommandOption[];

  /**
   * If the option is a channel type, the channels shown will be restricted to these types.
   */
  channel_types?: ChannelType[];

  /**
   * If the option is an INTEGER or NUMBER type, the minimum value permitted.
   */
  min_value?: number;

  /**
   * If the option is an INTEGER or NUMBER type, the maximum value permitted.
   */
  max_value?: number;

  /**
   * For option type STRING, the minimum allowed length (minimum of 0, maximum of 6000).
   */
  min_length?: number;

  /**
   * For option type STRING, the maximum allowed length (minimum of 1, maximum of 6000).
   */
  max_length?: number;

  /**
   * If autocomplete interactions are enabled for this STRING, INTEGER, or NUMBER type option.
   */
  autocomplete?: boolean;
}

export enum ApplicationCommandType {
  /**
   * Slash commands; a text-based command that shows up when a user types /
   */
  ChatInput = 1,

  /**
   * A UI-based command that shows up when you right click or tap on a user.
   */
  User = 2,

  /**
   * A UI-based command that shows up when you right click or tap on a message.
   */
  Message = 3,
}

export interface ApplicationCommand {
  id: string;
  description: string;
  application_id: string;
  options?: ApplicationCommandOption[];

  /**
   * Localization dictionary for the name field. Values follow the same restrictions as name.
   */
  name_localizations?: { [key: string]: string };

  /**
   * Localization dictionary for description field. Values follow the same restrictions as description
   */
  description_localizations?: { [key: string]: string };

  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.
   */
  dm_permission?: boolean;

  /**
   * Autoincrementing version identifier updated during substantial record changes.
   */
  version?: string;

  /**
   * Set of permissions represented as a bit set.
   */
  default_member_permissions?: string;

  /**
   * Name of command, 1-32 characters.
   */
  name: string;

  /**
   * Guild id of the command, if not global.
   */
  guild_id?: string;

  /**
   * Type of command, defaults to ChatInput.
   */
  type?: ApplicationCommandType;
}

export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,

  /**
   * Any integer between -2^53 and 2^53.
   */
  Integer = 4,

  Boolean = 5,
  User = 6,

  /**
   * Includes all channel types + categories.
   */
  Channel = 7,

  Role = 8,

  /**
   * Includes users and roles.
   */
  Mentionable = 9,

  /**
   * Any double between -2^53 and 2^53.
   */
  Number = 10,

  Attachment = 11,
}

export interface ResolvedData {
  /**
   * The ids and User objects.
   */
  users?: string[];

  /**
   * The ids and partial Member objects.
   */
  members?: string[];

  /**
   * The ids and Role objects.
   */
  roles?: string[];

  /**
   * The ids and partial Channel objects.
   */
  channels?: string[];

  /**
   * The ids and partial Message objects.
   */
  messages?: string[];

  /**
   * The ids and attachment objects.
   */
  attachments?: string[];
}

export interface InteractionApplicationCommandDataOptionBase {
  name: string;

  /**
   * Is true if this option is the currently focused option for autocomplete.
   */
  focused?: boolean;
}

export interface InteractionApplicationCommandDataOptionSub extends InteractionApplicationCommandDataOptionBase {
  type: ApplicationCommandOptionType.SubCommand | ApplicationCommandOptionType.SubCommandGroup;

  /**
   * Present if this option is a group or subcommand.
   */
  options: InteractionApplicationCommandDataOption[];
}

export interface InteractionApplicationCommandDataOptionBool extends InteractionApplicationCommandDataOptionBase {
  type: ApplicationCommandOptionType.Boolean;

  /**
   * Value of the option resulting from user input.
   */
  value: boolean;
}

export interface InteractionApplicationCommandDataOptionNum extends InteractionApplicationCommandDataOptionBase {
  type: ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer;

  /**
   * Value of the option resulting from user input.
   */
  value: number;
}

export interface InteractionApplicationCommandDataOptionString extends InteractionApplicationCommandDataOptionBase {
  type: ApplicationCommandOptionType.String;

  /**
   * Value of the option resulting from user input.
   */
  value: string;
}

export type InteractionApplicationCommandDataOption =
  | InteractionApplicationCommandDataOptionString
  | InteractionApplicationCommandDataOptionNum
  | InteractionApplicationCommandDataOptionBool
  | InteractionApplicationCommandDataOptionSub;

export interface InteractionMessageComponentDataBase {
  custom_id: string;
}

export interface InteractionMessageComponentDataClick extends InteractionMessageComponentDataBase {
  component_type: ComponentType.ActionRow | ComponentType.Button;
}

export interface InteractionMessageComponentDataSelectMenu extends InteractionMessageComponentDataBase {
  component_type: ComponentType.SelectMenu;

  /**
   * Values the user selected in a select menu component.
   */
  values?: string[];
}

export type InteractionMessageComponentData =
  | InteractionMessageComponentDataClick
  | InteractionMessageComponentDataSelectMenu;

export enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

export enum InteractionCallbackType {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
  DeferredUpdateMessage = 6,
  UpdateMessage = 7,
  ApplicationCommandAutocompleteResult = 8,
  Modal = 9,
}

export interface InteractionBase {
  id: string;
  version: 1;
  data?: unknown;

  /**
   * ID of the application this interaction is for.
   */
  application_id: string;

  /**
   * Continuation token for responding to the interaction.
   */
  token: string;

  /**
   * User object for the invoking user, if invoked in a DM.
   */
  user?: User;

  /**
   * Guild member data for the invoking user, including permissions.
   */
  member?: GuildMember;

  /**
   * For components, the message they were attached to.
   */
  message?: Message;

  /**
   * Bitwise set of permissions the app or bot has within the channel the interaction was sent from.
   */
  app_permissions?: string;

  /**
   * Selected language of the invoking user.
   * For more information: https://discord.com/developers/docs/reference#locales
   */
  locale?: string;

  /**
   * Guild's preferred locale, if invoked in a guild.
   * For more information: https://discord.com/developers/docs/reference#locales
   */
  guild_locale?: string;
}

export interface InteractionPing extends InteractionBase {
  type: InteractionType.Ping;
}

export interface InteractionModalSubmit extends InteractionBase {
  type: InteractionType.ModalSubmit;
  data: {
    /** custom_id of the modal. */
    custom_id: string;
    components: ComponentTextInput[];
  };
}

export interface InteractionMessageComponent extends InteractionBase {
  type: InteractionType.MessageComponent;
  data: InteractionMessageComponentData;
}

export interface InteractionApplicationCommand extends InteractionBase {
  type: InteractionType.ApplicationCommand | InteractionType.ApplicationCommandAutocomplete;
  data: {
    id: string;
    name: string;
    type: ApplicationCommandType;

    options?: InteractionApplicationCommandDataOption[];

    /**
     * Converted users + roles + channels + attachments.
     */
    resolved?: ResolvedData;

    /**
     * The id of the guild the command is registered to.
     */
    guild_id?: string;

    /**
     * ID of the user or message targeted by a user or message command.
     */
    target_id?: string;
  };
}

export type Interaction =
  | InteractionPing
  | InteractionModalSubmit
  | InteractionMessageComponent
  | InteractionApplicationCommand;

export interface WebhookClientConfig {
  /**
   * The port for the Webhook HTTP server. Defaults to 8080.
   */
  port?: number;

  /**
   * The host for the Webhook HTTP server. Defaults to 0.0.0.0.
   */
  host?: string;

  /**
   * The public key of the discord application.
   */
  publicKey: string;
}

export interface EmbedFooter {
  text: string;

  /**
   * Url of footer icon (only supports http(s) and attachments)
   */
  icon_url?: string;

  /**
   * A proxied url of footer icon.
   */
  proxy_icon_url: string;
}

export interface EmbedAsset {
  /**
   * Source url of asset (only supports http(s) and attachments).
   */
  url: string;

  /**
   * A proxied url of the asset.
   */
  proxy_url?: string;

  width?: number;
  height?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface MessageEmbedAuthor {
  name: string;
  url?: string;

  /**
   * Url of author icon (only supports http(s) and attachments).
   */
  icon_url?: string;

  /**
   * A proxied url of author icon.
   */
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;

  /**
   * Whether or not this field should display inline
   */
  inline?: boolean;
}

export interface Embed {
  title?: string;
  description?: string;
  url?: string;

  footer?: EmbedFooter;
  image?: EmbedAsset;
  thumbnail?: EmbedAsset;
  video?: EmbedAsset;
  provider?: EmbedProvider;
  fields?: EmbedField[];

  /**
   * ISO8601 timestamp of embed content.
   */
  timestamp?: string;

  /**
   * Color code of the embed
   */
  color?: number;
}

export enum MessageAllowedMentionType {
  Role = "roles",
  Users = "users",

  /**
   * Controls @everyone and @here mentions.
   */
  Everyone = "everyone",
}

export interface MessageAllowedMention {
  /**
   * An array of allowed mention types to parse from the content.
   */
  parse: MessageAllowedMentionType[];

  /**
   * 	Array of role_ids to mention (Max size of 100).
   */
  roles: string[];

  /**
   * Array of user_ids to mention (Max size of 100)
   */
  users: string[];

  /**
   * For replies, whether to mention the author of the message being replied to (default false)
   */
  replied_user?: boolean;
}

export enum ComponentType {
  /**
   * A container for other components.
   */
  ActionRow = 1,

  /**
   * A button object.
   */
  Button = 2,

  /**
   * A select menu for picking from choices.
   */
  SelectMenu = 3,

  /**
   * A text input object.
   */
  TextInput = 4,
}

export enum ComponentButtonStyle {
  /** Blurple color. */
  Primary = 1,

  /** Grey color. */
  Secondary = 2,

  /** Green color. */
  Success = 3,

  /** Red color. */
  Danger = 4,

  /** Grey color, navigates to a URL. */
  Link = 5,
}

export interface Emoji {
  id: string;
  name: string;
  animated?: boolean;
}

export interface ComponentButtonBase {
  /**
   * Text that appears on the button, max 80 characters
   */
  label?: string;

  emoji?: Emoji;

  disabled?: boolean;
}

export interface ComponentButtonCustom extends ComponentButtonBase {
  type: ComponentType.Button;
  style:
    | ComponentButtonStyle.Primary
    | ComponentButtonStyle.Success
    | ComponentButtonStyle.Danger
    | ComponentButtonStyle.Secondary;

  /**
   * A developer-defined identifier for the button, max 100 characters
   */
  custom_id: string;
}

export interface ComponentButtonLink extends ComponentButtonBase {
  type: ComponentType.Button;
  style: ComponentButtonStyle.Link;

  /**
   * A url for link-style buttons.
   */
  url?: string;
}

export type ComponentButton = ComponentButtonCustom | ComponentButtonLink;

export interface ComponentActionRow {
  type: ComponentType.ActionRow;
  components: (ComponentButton | ComponentSelectMenu | ComponentTextInput)[];
}

export interface ComponentSelectOption {
  /**
   * The user-facing name of the option, max 100 characters.
   */
  label: string;

  /**
   * The dev-defined value of the option, max 100 characters.
   */
  value: string;

  /**
   * An additional description of the option, max 100 characters.
   */
  description?: string;

  emoji?: Emoji;

  /**
   * Will render this option as selected by default.
   */
  default?: boolean;
}

export interface ComponentSelectMenu {
  type: ComponentType.SelectMenu;

  /**
   * A developer-defined identifier for the select menu, max 100 characters.
   */
  custom_id: string;

  /**
   * The choices in the select, max 25.
   */
  options: ComponentSelectOption[];

  /**
   * Custom placeholder text if nothing is selected, max 150 characters.
   */
  placeholder?: string;

  /**
   * The minimum number of items that must be chosen; default 1, min 0, max 25.
   */
  min_values?: number;

  /**
   * The maximum number of items that can be chosen; default 1, max 25.
   */
  max_values?: number;

  /**
   * Disable the select, default false.
   */
  disabled?: boolean;
}

export enum ComponentTextInputStyle {
  /**
   * A single-line input.
   */
  Short = 1,

  /**
   * A multi-line input.
   */
  Paragraph = 2,
}

export interface ComponentTextInput {
  type: ComponentType.TextInput;
  style: ComponentTextInputStyle;

  /**
   * A developer-defined identifier for the input, max 100 characters.
   */
  custom_id: string;

  /**
   * The label for this component, max 45 characters.
   */
  label: string;

  /**
   * The minimum input length for a text input, min 0, max 4000.
   */
  min_length: number;

  /**
   * The maximum input length for a text input, min 1, max 4000.
   */
  max_length: number;

  /**
   * Whether this component is required to be filled, default true
   */
  required?: boolean;

  /**
   * A pre-filled value for this component, max 4000 characters.
   */
  value?: string;

  /**
   * Custom placeholder text if the input is empty, max 100 characters.
   */
  placeholder?: string;
}

export type MessageComponent = ComponentActionRow | ComponentButton | ComponentSelectMenu;

export interface Attachment {
  id: string;

  /**
   * Name of file attached.
   */
  filename: string;

  /**
   * Size of file in bytes.
   */
  size: number;

  /**
   * Source url of file.
   */
  url: string;

  description?: string;

  /**
   * The attachment's media type. (Ex. `image/png`)
   */
  content_type?: string;

  /**
   * Height of file (if image).
   */
  height?: number;

  /**
   * Width of file (if image).
   */
  width?: number;

  /**
   * Whether this attachment is ephemeral.
   */
  ephemeral?: boolean;
}

export interface ApplicationCommandChoice {
  /**
   * 1-100 character choice name.
   */
  name: string;

  /**
   * Value for the choice, up to 100 characters if string.
   */
  value: string;

  /**
   * Localization dictionary for the name field. Values follow the same restrictions as name.
   */
  name_localizations?: { [key: string]: string };
}

export interface InteractionCallbackMessage {
  type:
    | InteractionCallbackType.DeferredUpdateMessage
    | InteractionCallbackType.DeferredUpdateMessage
    | InteractionCallbackType.ChannelMessageWithSource
    | InteractionCallbackType.DeferredChannelMessageWithSource;
  data: {
    /**
     * True if the response is TTS.
     */
    tts?: boolean;

    /**
     * Message content.
     */
    content?: string;

    /**
     * Up to 10 embeds for the message.
     */
    embeds?: Embed[];

    allowed_mentions?: MessageAllowedMention[];

    /**
     * Message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set)
     */
    flags?: number;

    components?: MessageComponent[];

    /**
     * Attachment objects with filename and description.
     */
    attachments?: Attachment[];
  };
}

export interface InteractionCallbackAutocomplete {
  type: InteractionCallbackType.ApplicationCommandAutocompleteResult;
  data: {
    choices: ApplicationCommandChoice[];
  };
}

export interface InteractionCallbackModal {
  type: InteractionCallbackType.Modal;
  data: {
    /**
     * A developer-defined identifier for the component, max 100 characters.
     */
    custom_id: string;

    /**
     * The title of the popup modal, max 45 characters.
     */
    title: string;

    /**
     * Between 1 and 5 (inclusive) components that make up the modal.
     */
    components: ComponentTextInput[];
  };
}

export interface InteractionCallbackPong {
  type: InteractionCallbackType.Pong;
}

export type InteractionCallback =
  | InteractionCallbackPong
  | InteractionCallbackMessage
  | InteractionCallbackModal
  | InteractionCallbackAutocomplete;
