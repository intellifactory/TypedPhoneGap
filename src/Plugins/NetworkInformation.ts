﻿// Copyright 2013-2014 IntelliFactory
//
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License.  You may
// obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied.  See the License for the specific language governing
// permissions and limitations under the License.

/// org.apache.cordova.network-information plugin:
/// https://github.com/apache/cordova-plugin-network-information

module TypedPhoneGap.NetworkInformation {

    export interface Plugin {
        connection: Connection;
        offline: NetworkEvent;
        online: NetworkEvent;
    }

    export interface Connection {
        type: ConnectionType;
        UNKNOWN: ConnectionType;
        ETHERNET: ConnectionType;
        WIFI: ConnectionType;
        CELL_2G: ConnectionType;
        CELL_3G: ConnectionType;
        CELL_4G: ConnectionType;
        CELL: ConnectionType;
        NONE: ConnectionType;
    }

    export interface ConnectionType { }

    var p =
        Utility.definePlugin<Plugin>({
            id: "org.apache.cordova.network-information",
            name: "TypedPhoneGap.NetworkInformation",
            def: function () {
                return {
                    connection: Utility.field<Connection>(navigator, "connection"),
                    offline: defineEvent("offline"),
                    online: defineEvent("online")
                };
            }
        });

    export interface NetworkEvent extends Utility.VoidWindowEvent { }

    function defineEvent(name: string): NetworkEvent {
        return Utility.defineVoidWindowEvent(name);
    }

    export function getPlugin(): Plugin {
        return p.getPlugin();
    }
}
