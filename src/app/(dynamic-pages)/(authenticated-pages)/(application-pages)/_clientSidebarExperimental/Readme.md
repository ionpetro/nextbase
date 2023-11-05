# Purpose

Ideally the \_sidebar component group should be a parallel route. But currently we are seeing some unexpected undocumented errors which are in the way. Hence we are using a client side usePathname based component group for now.
When the parallel routes become more stable, we will replace this with the server component parallel route slots.
