interface MappingPair {
  [ inx: number ]: Function | string;
}
interface MappingArray<MappingPair> {
  [ inx: number ]: MappingPair;
  push( arr: MappingPair ): void;
}

export function Before( mapping: MappingPair | MappingArray<MappingPair> | Function, method?: string );
export function After( mapping: MappingPair | MappingArray<MappingPair> | Function, method?: string );
export function Pointcut( target: Object | Function, method: string,
  descriptor: PropertyDescriptor ): PropertyDescriptor;

