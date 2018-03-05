React DND notes:

React Synthetic Events: abstract away browser differences to process native DOM events

Items and Types

Like Redux, ReactDND uses data, not the views, as the source of truth. When something is being dragged, we don’t say it’s a component or DOM node, we say its an Item of a certain Type.

An item is a POJO describing whats being dragged.

A type is a string uniquely identifying a whole class of items in your app.

The types let you specify which drag sources and drop targets are compatible.

(enumeration: a way to associate strings with integers!)

Monitor

Drag and drop is inherently stateful. Either you’re dragging or not, either there is a current type and a current item, or there isn’t. This state has to live somewhere.

ReactDnd exposes this state to your components via a few tiny wrappers over the internal state storage called the monitors. The monitors lets you update the props of your components in response to the drag and drop state changes.

A collecting function lets each component that needs to track the drag and drop state retrieve the relevant data from the monitors.

Connectors

The backend handles the DOM events, and the components use React to describe the DOM, so how does the backend know which DOM nodes to listen to? Connectors!

Connectors let you assign one of the predefined roles (drag source, drag preview, drop target) to the DOM nodes in your render function.

A connector is passed as the first argument into the collecting function.

In the components render method, we are able to access both the data obtained from the monitor, and the function obtained from the connector.

Drag Sources and Drop Targets

Drag sources and drop targets are the primary abstraction units of React DnD. They tie the types, the items, the side effects, and the collecting functions together with your components.

When you want to make a component draggable, you have to wrap that component into a drag source declaration.

Every drag source is registered for a certain type, and has to implement a method producing an item from the components’ props.

The drag source declaration also lets you specify the collecting function for the given component.

The drop targets are similar to the drag sources. The only difference is a single drop target may register for several item types at once, and instead of producing an item, it may handle its hover or drop.
