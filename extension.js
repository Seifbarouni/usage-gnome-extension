const St = imports.gi.St;
const Main = imports.ui.main;
const MainLoop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton, panelButtonText, timeout;
const SCRIPT_PATH = '/home/seif/Documents/other/scripts/usage.sh'
function setButtonText() {
    const [ok, out, err, exit] = GLib.spawn_command_line_sync(SCRIPT_PATH)
    panelButtonText.set_text(out.toString())
    return true
}

function init() {
    panelButton = new St.Bin({
        style_class: "panel-button"
    })
    panelButtonText = new St.Label({
        style_class: "panel",
    })
    panelButton.set_child(panelButtonText)
}

function enable() {
    Main.panel._leftBox.insert_child_at_index(panelButton, 1)
    timeout = MainLoop.timeout_add_seconds(3.0, setButtonText)
}

function disable() {
    MainLoop.source_remove(timeout)
    Main.panel._leftBox.remove_child(panelButton, 1)
}
