'use client';

import DesignTool from './_components/design-tool';
import DesignCardWrapper from './_components/design-card-wrapper';
import { useApparelQuery } from '../queries';
import { CardContent, Progress } from '@ui-kit/ui';

export default function Page() {
  const { data, isLoading } = useApparelQuery();
  return (
    <div className="flex flex-row pt-20 min-w-[375px]">
      <DesignCardWrapper
        title="T-Shirt and Sweater Designer"
        description="Create your unique designs for t-shirts and sweaters with ease, then save your customized creations effortlessly."
      >
        <CardContent className="flex flex-col md:flex-row gap-8">
          {isLoading ? (
            <Progress indeterminate={true} />
          ) : (
            <DesignTool initialValues={data?.apparelType ? data : undefined} />
          )}
        </CardContent>
      </DesignCardWrapper>
    </div>
  );
}
