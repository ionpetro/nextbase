import { CustomHead } from '@/components/CustomHead';
import { PRODUCT_NAME } from '@/constants';

export default function Head() {
  return (
    <>
      <CustomHead>
        <title>{`Organization Team | ${PRODUCT_NAME}`}</title>
      </CustomHead>
    </>
  );
}
