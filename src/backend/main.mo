import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    dedication : Text;
    gameCompleted : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Application-specific progress functions
  public shared ({ caller }) func saveUserProgress(name : Text, dedication : Text, gameCompleted : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can persist progress");
    };
    let profile = { name; dedication; gameCompleted };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func checkGameCompleted() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can check progress");
    };
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.gameCompleted };
    };
  };

  public query ({ caller }) func getUserProgress() : async (Text, Text, Bool) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can retrieve progress");
    };
    switch (userProfiles.get(caller)) {
      case (null) { ("", "", false) };
      case (?profile) { (profile.name, profile.dedication, profile.gameCompleted) };
    };
  };
};
