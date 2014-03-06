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

module TypedPhoneGap.Utility {

    export interface PluginInfo<T> {
        id: string;
        name: string;
        def: () => T;
    }

    export interface Plugin<T> {
        getPlugin(): T;
    }

    function complain<T>(info: PluginInfo<T>, err: Error) {
        throw new Error(info.name + ": Check if the " + info.id + " plugin is enabled. Error: " + String(err));
    }

    export function definePlugin<T>(info: PluginInfo<T>): Plugin<T> {
        var cache = null;
        return {
            getPlugin: function () {
                if (cache === null) {
                    try {
                        cache = info.def();
                    } catch (e) {
                        complain<T>(info, e);
                    }
                }
                return cache;
            }
        };
    }

    export function field<T>(parent: any, name: string, def?: any): T {
        if (parent && Object(parent).hasOwnProperty(name)) {
            return parent[name];
        } else if (def) {
            return def;
        } else {
            throw new Error("No such property: " + name);
        }
    }

    export interface VoidWindowEvent {
        add(handler: () => void): void;
        remove(handler: () => void): void;
        name: string;
    }

    export function defineVoidWindowEvent(name: string): VoidWindowEvent {
        return {
            add: function (f: () => void) {
                var g: any = f;
                window.addEventListener(name, g, false);
            },
            name: name,
            remove: function (f: () => void) {
                var g: any = f;
                window.removeEventListener(name, g, false);
            }
        };
    }

    export interface WindowEvent<T> {
        add(handler: (evt: T) => void): void;
        remove(handler: (evt: T) => void): void;
        name: string;
    }

    export function defineWindowEvent<T>(name: string): WindowEvent<T> {
        return {
            add: function (f: (args: T) => void) {
                var g: any = f;
                window.addEventListener(name, g, false);
            },
            name: name,
            remove: function (f: (args: T) => void) {
                var g: any = f;
                window.removeEventListener(name, g, false);
            }
        };
    }

}
