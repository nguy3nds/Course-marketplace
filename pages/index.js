import { Hero, Breadcrumbs } from "@components/ui/common";
import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderCard } from "@components/ui/order";
import { EthRates } from "@components/ui/web3";
import WalletBar from "@components/ui/web3/walletbar";
import { getAllCourses } from "@content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
      <CourseList
        courses={courses}
      >
        {course =>
          <CourseCard
            key={course.id}
            course={course}
          />
        }
      </CourseList>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout